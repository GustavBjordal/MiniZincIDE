SOURCES += \
    $$PWD/src/cpprofiler/core.cpp \
    $$PWD/src/cpprofiler/command_line_parser.cpp \
    $$PWD/src/cpprofiler/name_map.cpp \
    $$PWD/src/cpprofiler/tcp_server.cpp \
    $$PWD/src/cpprofiler/receiver_thread.cpp \
    $$PWD/src/cpprofiler/receiver_worker.cpp \
    $$PWD/src/cpprofiler/conductor.cpp \
    $$PWD/src/cpprofiler/execution.cpp \
    $$PWD/src/cpprofiler/user_data.cpp \
    $$PWD/src/cpprofiler/tree_builder.cpp \
    $$PWD/src/cpprofiler/execution_list.cpp \
    $$PWD/src/cpprofiler/execution_window.cpp \
    $$PWD/src/cpprofiler/utils/utils.cpp \
    $$PWD/src/cpprofiler/utils/string_utils.cpp \
    $$PWD/src/cpprofiler/utils/path_utils.cpp \
    $$PWD/src/cpprofiler/utils/tree_utils.cpp \
    $$PWD/src/cpprofiler/utils/perf_helper.cpp \
    $$PWD/src/cpprofiler/utils/array.cpp \
    $$PWD/src/cpprofiler/utils/std_ext.cpp \
    $$PWD/src/cpprofiler/utils/maybe_caller.cpp \
    $$PWD/src/cpprofiler/tree/node.cpp \
    $$PWD/src/cpprofiler/tree/structure.cpp \
    $$PWD/src/cpprofiler/tree/layout.cpp \
    $$PWD/src/cpprofiler/tree/layout_computer.cpp \
    $$PWD/src/cpprofiler/tree/shape.cpp \
    $$PWD/src/cpprofiler/tree/node_tree.cpp \
    $$PWD/src/cpprofiler/tree/node_id.cpp \
    $$PWD/src/cpprofiler/tree/node_info.cpp \
    $$PWD/src/cpprofiler/tree/visual_flags.cpp \
    $$PWD/src/cpprofiler/tree/traditional_view.cpp \
    $$PWD/src/cpprofiler/pixel_views/pt_canvas.cpp \
    $$PWD/src/cpprofiler/pixel_views/icicle_canvas.cpp \
    $$PWD/src/cpprofiler/pixel_views/pixel_image.cpp \
    $$PWD/src/cpprofiler/pixel_views/pixel_widget.cpp \
    $$PWD/src/cpprofiler/tree/tree_scroll_area.cpp \
    $$PWD/src/cpprofiler/tree/cursors/node_cursor.cpp \
    $$PWD/src/cpprofiler/tree/cursors/drawing_cursor.cpp \
    $$PWD/src/cpprofiler/tree/cursors/layout_cursor.cpp \
    $$PWD/src/cpprofiler/tree/cursors/hide_failed_cursor.cpp \
    $$PWD/src/cpprofiler/tree/cursors/hide_not_highlighted_cursor.cpp \
    $$PWD/src/cpprofiler/tree/cursors/nodevisitor.hpp \
    $$PWD/src/cpprofiler/analysis/similar_subtree_analysis.cpp \
    $$PWD/src/cpprofiler/analysis/similar_subtree_window.cpp \
    $$PWD/src/cpprofiler/analysis/path_comp.cpp \
    $$PWD/src/cpprofiler/analysis/merge_window.cpp \
    $$PWD/src/cpprofiler/analysis/merging/pentagon_rect.cpp \
    $$PWD/src/cpprofiler/analysis/tree_merger.cpp \
    $$PWD/src/cpprofiler/analysis/histogram_scene.cpp \
    $$PWD/src/cpprofiler/analysis/pattern_rect.cpp \
    $$PWD/src/cpprofiler/tree/node_drawing.cpp \
    $$PWD/src/cpprofiler/db_handler.cpp \
    $$PWD/src/cpprofiler/solver_data.cpp \
    $$PWD/src/cpprofiler/nogood_dialog.cpp \

HEADERS += \
    $$PWD/src/cpprofiler/config.hh \
    $$PWD/src/cpprofiler/options.hh \
    $$PWD/src/cpprofiler/command_line_parser.hh \
    $$PWD/src/cpprofiler/name_map.hh \
    $$PWD/src/cpprofiler/settings.hh \
    $$PWD/src/cpprofiler/conductor.hh \
    $$PWD/src/cpprofiler/tcp_server.hh \
    $$PWD/src/cpprofiler/receiver_thread.hh \
    $$PWD/src/cpprofiler/receiver_worker.hh \
    $$PWD/src/cpprofiler/execution.hh \
    $$PWD/src/cpprofiler/user_data.hh \
    $$PWD/src/cpprofiler/tree_builder.hh \
    $$PWD/src/cpprofiler/execution_list.hh \
    $$PWD/src/cpprofiler/execution_window.hh \
    $$PWD/src/cpprofiler/utils/utils.hh \
    $$PWD/src/cpprofiler/utils/string_utils.hh \
    $$PWD/src/cpprofiler/utils/path_utils.hh \
    $$PWD/src/cpprofiler/utils/tree_utils.hh \
    $$PWD/src/cpprofiler/utils/perf_helper.hh \
    $$PWD/src/cpprofiler/utils/array.hh \
    $$PWD/src/cpprofiler/utils/debug.hh \
    $$PWD/src/cpprofiler/utils/std_ext.hh \
    $$PWD/src/cpprofiler/utils/maybe_caller.hh \
    $$PWD/src/cpprofiler/tree/node.hh \
    $$PWD/src/cpprofiler/tree/structure.hh \
    $$PWD/src/cpprofiler/tree/layout.hh \
    $$PWD/src/cpprofiler/tree/layout_computer.hh \
    $$PWD/src/cpprofiler/tree/shape.hh \
    $$PWD/src/cpprofiler/tree/node_tree.hh \
    $$PWD/src/cpprofiler/tree/node_id.hh \
    $$PWD/src/cpprofiler/tree/node_info.hh \
    $$PWD/src/cpprofiler/tree/node_stats.hh \
    $$PWD/src/cpprofiler/tree/visual_flags.hh \
    $$PWD/src/cpprofiler/tree/traditional_view.hh \
    $$PWD/src/cpprofiler/pixel_views/pt_canvas.hh \
    $$PWD/src/cpprofiler/pixel_views/icicle_canvas.hh \
    $$PWD/src/cpprofiler/pixel_views/pixel_image.hh \
    $$PWD/src/cpprofiler/pixel_views/pixel_widget.hh \
    $$PWD/src/cpprofiler/tree/tree_scroll_area.hh \
    $$PWD/src/cpprofiler/tree/subtree_view.hh \
    $$PWD/src/cpprofiler/tree/cursors/node_cursor.hh \
    $$PWD/src/cpprofiler/tree/cursors/drawing_cursor.hh \
    $$PWD/src/cpprofiler/tree/cursors/layout_cursor.hh \
    $$PWD/src/cpprofiler/tree/cursors/hide_failed_cursor.hh \
    $$PWD/src/cpprofiler/tree/cursors/hide_not_highlighted_cursor.hh \
    $$PWD/src/cpprofiler/tree/cursors/nodevisitor.hh \
    $$PWD/src/cpprofiler/core.hh \
    $$PWD/src/cpprofiler/solver_id.hh \
    $$PWD/src/cpprofiler/utils/debug_mutex.hh \
    $$PWD/src/cpprofiler/analysis/similar_subtree_analysis.hh \
    $$PWD/src/cpprofiler/analysis/similar_subtree_window.hh \
    $$PWD/src/cpprofiler/analysis/merge_window.hh \
    $$PWD/src/cpprofiler/analysis/pentagon_counter.hpp \
    $$PWD/src/cpprofiler/analysis/tree_merger.hh \
    $$PWD/src/cpprofiler/analysis/subtree_pattern.hh \
    $$PWD/src/cpprofiler/analysis/path_comp.hh \
    $$PWD/src/cpprofiler/analysis/histogram_scene.hh \
    $$PWD/src/cpprofiler/analysis/pattern_rect.hh \
    $$PWD/src/cpprofiler/analysis/merging/pentagon_list_widget.hh \
    $$PWD/src/cpprofiler/analysis/merging/merge_result.hh \
    $$PWD/src/cpprofiler/analysis/merging/pentagon_rect.hh \
    $$PWD/src/cpprofiler/tree/node_widget.hh \
    $$PWD/src/cpprofiler/tree/node_drawing.hh \
    $$PWD/src/cpprofiler/db_handler.hh \
    $$PWD/src/cpprofiler/solver_data.hh \
    $$PWD/src/cpprofiler/nogood_dialog.hh \
    $$PWD/src/cpprofiler/analysis/nogood_analysis_dialog.hh \

SOURCES += \
    $$PWD/src/cpprofiler/tests/tree_test.cpp \
    $$PWD/src/cpprofiler/tests/execution_test.cpp \

HEADERS += \
    $$PWD/src/cpprofiler/tests/tree_test.hh \
    $$PWD/src/cpprofiler/tests/execution_test.hh \
