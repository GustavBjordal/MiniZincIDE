var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="vpsc.ts"/>
///<reference path="rbtree.d.ts"/>
var vpsc;
(function (vpsc) {
    function computeGroupBounds(g) {
        g.bounds = g.leaves.reduce(function (r, c) {
            return c.bounds.union(r);
        }, Rectangle.empty());
        if (typeof g.groups !== "undefined")
            g.bounds = g.groups.reduce(function (r, c) {
                return computeGroupBounds(c).union(r);
            }, g.bounds);
        return g.bounds;
    }
    vpsc.computeGroupBounds = computeGroupBounds;

    var Rectangle = (function () {
        function Rectangle(x, X, y, Y) {
            this.x = x;
            this.X = X;
            this.y = y;
            this.Y = Y;
        }
        Rectangle.empty = function () {
            return new Rectangle(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
        };

        Rectangle.prototype.cx = function () {
            return (this.x + this.X) / 2;
        };

        Rectangle.prototype.cy = function () {
            return (this.y + this.Y) / 2;
        };

        Rectangle.prototype.overlapX = function (r) {
            var ux = this.cx(), vx = r.cx();
            if (ux <= vx && r.x < this.X)
                return this.X - r.x;
            if (vx <= ux && this.x < r.X)
                return r.X - this.x;
            return 0;
        };

        Rectangle.prototype.overlapY = function (r) {
            var uy = this.cy(), vy = r.cy();
            if (uy <= vy && r.y < this.Y)
                return this.Y - r.y;
            if (vy <= uy && this.y < r.Y)
                return r.Y - this.y;
            return 0;
        };

        Rectangle.prototype.setXCentre = function (cx) {
            var dx = cx - this.cx();
            this.x += dx;
            this.X += dx;
        };

        Rectangle.prototype.setYCentre = function (cy) {
            var dy = cy - this.cy();
            this.y += dy;
            this.Y += dy;
        };

        Rectangle.prototype.width = function () {
            return this.X - this.x;
        };

        Rectangle.prototype.height = function () {
            return this.Y - this.y;
        };

        Rectangle.prototype.union = function (r) {
            return new Rectangle(Math.min(this.x, r.x), Math.max(this.X, r.X), Math.min(this.y, r.y), Math.max(this.Y, r.Y));
        };
        return Rectangle;
    })();
    vpsc.Rectangle = Rectangle;

    var Node = (function () {
        function Node(v, r, p) {
            this.v = v;
            this.r = r;
            this.pos = p;
            this.prev = makeRBTree();
            this.next = makeRBTree();
        }
        return Node;
    })();

    var Event = (function () {
        function Event(isOpen, v, p) {
            this.isOpen = isOpen;
            this.v = v;
            this.pos = p;
        }
        return Event;
    })();

    function compareEvents(a, b) {
        if (a.pos > b.pos) {
            return 1;
        }
        if (a.pos < b.pos) {
            return -1;
        }
        if (a.isOpen) {
            // open must come before close
            return -1;
        }
        return 0;
    }

    function makeRBTree() {
        return new RBTree(function (a, b) {
            return a.pos - b.pos;
        });
    }

    var xRect = {
        getCentre: function (r) {
            return r.cx();
        },
        getOpen: function (r) {
            return r.y;
        },
        getClose: function (r) {
            return r.Y;
        },
        getSize: function (r) {
            return r.width();
        },
        makeRect: function (open, close, center, size) {
            return new Rectangle(center - size / 2, center + size / 2, open, close);
        },
        findNeighbours: findXNeighbours
    };

    var yRect = {
        getCentre: function (r) {
            return r.cy();
        },
        getOpen: function (r) {
            return r.x;
        },
        getClose: function (r) {
            return r.X;
        },
        getSize: function (r) {
            return r.height();
        },
        makeRect: function (open, close, center, size) {
            return new Rectangle(open, close, center - size / 2, center + size / 2);
        },
        findNeighbours: findYNeighbours
    };

    function generateGroupConstraints(root, f, minSep, isContained) {
        if (typeof isContained === "undefined") { isContained = false; }
        var padding = typeof root.padding === 'undefined' ? 1 : root.padding, gn = typeof root.groups !== 'undefined' ? root.groups.length : 0, ln = typeof root.leaves !== 'undefined' ? root.leaves.length : 0, childConstraints = !gn ? [] : root.groups.reduce(function (ccs, g) {
            return ccs.concat(generateGroupConstraints(g, f, minSep, true));
        }, []), n = (isContained ? 2 : 0) + ln + gn, vs = new Array(n), rs = new Array(n), i = 0, add = function (r, v) {
            rs[i] = r;
            vs[i++] = v;
        };
        if (isContained) {
            var b = root.bounds, c = f.getCentre(b), s = f.getSize(b) / 2, open = f.getOpen(b), close = f.getClose(b), min = c - s, max = c + s;
            root.minVar.desiredPosition = min;
            add(f.makeRect(open, close, min, padding), root.minVar);
            root.maxVar.desiredPosition = max;
            add(f.makeRect(open, close, max, padding), root.maxVar);
        }
        if (ln)
            root.leaves.forEach(function (l) {
                return add(l.bounds, l.variable);
            });
        if (gn)
            root.groups.forEach(function (g) {
                var b = g.bounds;
                add(f.makeRect(f.getOpen(b), f.getClose(b), f.getCentre(b), f.getSize(b)), g.minVar);
            });
        var cs = generateConstraints(rs, vs, f, minSep);
        if (gn) {
            vs.forEach(function (v) {
                v.cOut = [], v.cIn = [];
            });
            cs.forEach(function (c) {
                c.left.cOut.push(c), c.right.cIn.push(c);
            });
            root.groups.forEach(function (g) {
                var gapAdjustment = (padding - f.getSize(g.bounds)) / 2;
                g.minVar.cIn.forEach(function (c) {
                    return c.gap += gapAdjustment;
                });
                g.minVar.cOut.forEach(function (c) {
                    c.left = g.maxVar;
                    c.gap += gapAdjustment;
                });
            });
        }
        return childConstraints.concat(cs);
    }

    function generateConstraints(rs, vars, rect, minSep) {
        var i, n = rs.length;
        var N = 2 * n;
        console.assert(vars.length >= n);
        var events = new Array(N);
        for (i = 0; i < n; ++i) {
            var r = rs[i];
            var v = new Node(vars[i], r, rect.getCentre(r));
            events[i] = new Event(true, v, rect.getOpen(r));
            events[i + n] = new Event(false, v, rect.getClose(r));
        }
        events.sort(compareEvents);
        var cs = new Array();
        var scanline = makeRBTree();
        for (i = 0; i < N; ++i) {
            var e = events[i];
            var v = e.v;
            if (e.isOpen) {
                scanline.insert(v);
                rect.findNeighbours(v, scanline);
            } else {
                // close event
                scanline.remove(v);
                var makeConstraint = function (l, r) {
                    var sep = (rect.getSize(l.r) + rect.getSize(r.r)) / 2 + minSep;
                    cs.push(new vpsc.Constraint(l.v, r.v, sep));
                };
                var visitNeighbours = function (forward, reverse, mkcon) {
                    var u, it = v[forward].iterator();
                    while ((u = it[forward]()) !== null) {
                        mkcon(u, v);
                        u[reverse].remove(v);
                    }
                };
                visitNeighbours("prev", "next", function (u, v) {
                    return makeConstraint(u, v);
                });
                visitNeighbours("next", "prev", function (u, v) {
                    return makeConstraint(v, u);
                });
            }
        }
        console.assert(scanline.size === 0);
        return cs;
    }

    function findXNeighbours(v, scanline) {
        var f = function (forward, reverse) {
            var it = scanline.findIter(v);
            var u;
            while ((u = it[forward]()) !== null) {
                var uovervX = u.r.overlapX(v.r);
                if (uovervX <= 0 || uovervX <= u.r.overlapY(v.r)) {
                    v[forward].insert(u);
                    u[reverse].insert(v);
                }
                if (uovervX <= 0) {
                    break;
                }
            }
        };
        f("next", "prev");
        f("prev", "next");
    }

    function findYNeighbours(v, scanline) {
        var f = function (forward, reverse) {
            var u = scanline.findIter(v)[forward]();
            if (u !== null && u.r.overlapX(v.r) > 0) {
                v[forward].insert(u);
                u[reverse].insert(v);
            }
        };
        f("next", "prev");
        f("prev", "next");
    }

    function generateXConstraints(rs, vars) {
        return generateConstraints(rs, vars, xRect, 1e-6);
    }
    vpsc.generateXConstraints = generateXConstraints;

    function generateYConstraints(rs, vars) {
        return generateConstraints(rs, vars, yRect, 1e-6);
    }
    vpsc.generateYConstraints = generateYConstraints;

    function generateXGroupConstraints(root) {
        return generateGroupConstraints(root, xRect, 1e-6);
    }
    vpsc.generateXGroupConstraints = generateXGroupConstraints;

    function generateYGroupConstraints(root) {
        return generateGroupConstraints(root, yRect, 1e-6);
    }
    vpsc.generateYGroupConstraints = generateYGroupConstraints;

    function removeOverlaps(rs) {
        var vs = rs.map(function (r) {
            return new vpsc.Variable(r.cx());
        });
        var cs = vpsc.generateXConstraints(rs, vs);
        var solver = new vpsc.Solver(vs, cs);
        solver.solve();
        vs.forEach(function (v, i) {
            return rs[i].setXCentre(v.position());
        });
        vs = rs.map(function (r) {
            return new vpsc.Variable(r.cy());
        });
        cs = vpsc.generateYConstraints(rs, vs);
        solver = new vpsc.Solver(vs, cs);
        solver.solve();
        vs.forEach(function (v, i) {
            return rs[i].setYCentre(v.position());
        });
    }
    vpsc.removeOverlaps = removeOverlaps;

    var IndexedVariable = (function (_super) {
        __extends(IndexedVariable, _super);
        function IndexedVariable(i, w) {
            _super.call(this, 0, w);
            this.index = i;
        }
        return IndexedVariable;
    })(vpsc.Variable);

    var Projection = (function () {
        function Projection(nodes, groups, rootGroup, constraints, avoidOverlaps) {
            if (typeof rootGroup === "undefined") { rootGroup = null; }
            if (typeof constraints === "undefined") { constraints = null; }
            if (typeof avoidOverlaps === "undefined") { avoidOverlaps = false; }
            var _this = this;
            this.nodes = nodes;
            this.rootGroup = rootGroup;
            this.groups = groups;
            this.avoidOverlaps = avoidOverlaps;
            this.variables = nodes.map(function (v, i) {
                return v.variable = new IndexedVariable(i, 1);
            });

            if (constraints)
                this.createConstraints(constraints);

            if (avoidOverlaps && rootGroup && typeof rootGroup.groups !== 'undefined') {
                nodes.forEach(function (v) {
                    var w2 = v.width / 2, h2 = v.height / 2;
                    v.bounds = new vpsc.Rectangle(v.x - w2, v.x + w2, v.y - h2, v.y + h2);
                });
                computeGroupBounds(rootGroup);
                var i = nodes.length;
                groups.forEach(function (g) {
                    _this.variables[i] = g.minVar = new IndexedVariable(i++, 0.01);
                    _this.variables[i] = g.maxVar = new IndexedVariable(i++, 0.01);
                });
            }
        }
        Projection.prototype.createSeparation = function (c) {
            return new vpsc.Constraint(this.nodes[c.left].variable, this.nodes[c.right].variable, c.gap, typeof c.equality !== "undefined" ? c.equality : false);
        };

        Projection.prototype.makeFeasible = function (c) {
            var _this = this;
            if (!this.avoidOverlaps)
                return;
            var axis = 'x', dim = 'width';
            if (c.axis === 'x')
                axis = 'y', dim = 'height';
            var vs = c.offsets.map(function (o) {
                return _this.nodes[o.node];
            }).sort(function (a, b) {
                return a[axis] - b[axis];
            });
            var p = null;
            vs.forEach(function (v) {
                if (p)
                    v[axis] = p[axis] + p[dim] + 1;
                p = v;
            });
        };

        Projection.prototype.createAlignment = function (c) {
            var _this = this;
            var u = this.nodes[c.offsets[0].node].variable;
            this.makeFeasible(c);
            var cs = c.axis === 'x' ? this.xConstraints : this.yConstraints;
            c.offsets.slice(1).forEach(function (o) {
                var v = _this.nodes[o.node].variable;
                cs.push(new vpsc.Constraint(u, v, o.offset, true));
            });
        };

        Projection.prototype.createConstraints = function (constraints) {
            var _this = this;
            var isSep = function (c) {
                return typeof c.type === 'undefined' || c.type === 'separation';
            };
            this.xConstraints = constraints.filter(function (c) {
                return c.axis === "x" && isSep(c);
            }).map(function (c) {
                return _this.createSeparation(c);
            });
            this.yConstraints = constraints.filter(function (c) {
                return c.axis === "y" && isSep(c);
            }).map(function (c) {
                return _this.createSeparation(c);
            });
            constraints.filter(function (c) {
                return c.type === 'alignment';
            }).forEach(function (c) {
                return _this.createAlignment(c);
            });
        };

        Projection.prototype.setupVariablesAndBounds = function (x0, y0, desired, getDesired) {
            this.nodes.forEach(function (v, i) {
                if (v.fixed) {
                    v.variable.weight = 1000;
                    desired[i] = getDesired(v);
                } else {
                    v.variable.weight = 1;
                }
                var w = v.width / 2, h = v.height / 2;
                var ix = x0[i], iy = y0[i];
                v.bounds = new Rectangle(ix - w, ix + w, iy - h, iy + h);
            });
        };

        Projection.prototype.xProject = function (x0, y0, x) {
            if (!this.rootGroup && !(this.avoidOverlaps || this.xConstraints))
                return;
            this.project(x0, y0, x0, x, function (v) {
                return v.px;
            }, this.xConstraints, generateXGroupConstraints, function (v) {
                return v.bounds.setXCentre(x[(v.variable).index] = v.variable.position());
            }, function (g) {
                g.bounds.x = x[(g.minVar).index] = g.minVar.position();
                g.bounds.X = x[(g.maxVar).index] = g.maxVar.position();
            });
        };

        Projection.prototype.yProject = function (x0, y0, y) {
            if (!this.rootGroup && !this.yConstraints)
                return;
            this.project(x0, y0, y0, y, function (v) {
                return v.py;
            }, this.yConstraints, generateYGroupConstraints, function (v) {
                return v.bounds.setYCentre(y[(v.variable).index] = v.variable.position());
            }, function (g) {
                g.bounds.y = y[(g.minVar).index] = g.minVar.position();
                g.bounds.Y = y[(g.maxVar).index] = g.maxVar.position();
            });
        };

        Projection.prototype.projectFunctions = function () {
            var _this = this;
            return [
                function (x0, y0, x) {
                    return _this.xProject(x0, y0, x);
                },
                function (x0, y0, y) {
                    return _this.yProject(x0, y0, y);
                }
            ];
        };

        Projection.prototype.project = function (x0, y0, start, desired, getDesired, cs, generateConstraints, updateNodeBounds, updateGroupBounds) {
            this.setupVariablesAndBounds(x0, y0, desired, getDesired);
            if (this.rootGroup && this.avoidOverlaps) {
                computeGroupBounds(this.rootGroup);
                cs = cs.concat(generateConstraints(this.rootGroup));
            }
            this.solve(this.variables, cs, start, desired);
            this.nodes.forEach(updateNodeBounds);
            if (this.rootGroup && this.avoidOverlaps) {
                this.groups.forEach(updateGroupBounds);
            }
        };

        Projection.prototype.solve = function (vs, cs, starting, desired) {
            var solver = new vpsc.Solver(vs, cs);
            solver.setStartingPositions(starting);
            solver.setDesiredPositions(desired);
            solver.solve();
        };
        return Projection;
    })();
    vpsc.Projection = Projection;
})(vpsc || (vpsc = {}));
//# sourceMappingURL=rectangle.js.map
