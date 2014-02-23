;(function($, window, document, undefined) {

    var fn = $.Gridster;

    fn.widgets_in_col = function(col) {
        if (!this.gridmap[col]) {
            return false;
        }

        for (var i = this.gridmap[col].length - 1; i >= 0; i--) {
            if (this.is_widget(col, i) !== false) {
                return true;
            }
        }

        return false;
    };

    fn.widgets_in_row = function(row) {
        for (var i = this.gridmap.length; i >= 1; i--) {
            if (this.is_widget(i, row) !== false) {
                return true;
            }
        }

        return false;
    };
    
    fn.move_widget_to = function($widget, row, col) {
        var self = this;
        var widget_grid_data = $widget.coords().grid;
        var diffY = row - widget_grid_data.row;
        var diffX = col - widget_grid_data.col;
        var $next_widgets = this.widgets_below($widget);
 
        var can_move_to_new_cell = this.can_move_to(
            widget_grid_data, col, row, $widget);
 
        if (can_move_to_new_cell === false) {
            return false;
        }
 
        this.remove_from_gridmap(widget_grid_data);
        widget_grid_data.row = row;
        widget_grid_data.col = col;
        this.add_to_gridmap(widget_grid_data);
        $widget.attr('data-row', row);
        $widget.attr('data-col', col);
        this.$changed = this.$changed.add($widget);
        console.log("her");

 
        return this;
    };
    
    fn.swap_widgets = function(widget1, widget2) {
        
        
        var wdg1Data = widget1.coords().grid;
        var wdg2Data = widget2.coords().grid;
        console.log("Swapping widgets");
//        this.remove_from_gridmap(wdg1Data);
//        this.remove_from_gridmap(wdg2Data);
//        this.add_to_gridmap(wdg1Data, widget2);
//        this.add_to_gridmap(wdg2Data, widget1);
        var wdg2new = jQuery.extend(true, {}, wdg2Data);
        var wdg1new = jQuery.extend(true, {}, wdg1Data);
        this.move_widget_to(widget1, wdg2Data.row, wdg2Data.col);
        this.move_widget_to(widget2, wdg1Data.row, wdg1Data.col);
//        this.mutate_widget_in_gridmap(widget2, wdg2Data, wdg1Data);
//       this.mutate_widget_in_gridmap(widget1, wdg1Data, wdg2new);
//        
//        console.log(this.get_widget_grid_data(widget1));
//        widget1.attr("data-row", widget2.attr("data-row"));
//        widget1.attr("data-col", widget2.attr("data-col"));
//        widget2.attr("data-row", one_row);
//        widget2.attr("data-col", one_col);
    },
    
    fn.get_widget_grid_data=function(widget) {
        var obj = {
                row:widget.attr("data-row"),
                col:widget.attr("data-col"),
                size_x:widget.attr("data-sizex"),
                size_y : widget.attr("data-sizey"),
        };
        return obj;
    },


    fn.widgets_in_range = function(col1, row1, col2, row2) {
        var valid_cols = [];
        var valid_rows = [];
        var $widgets = $([]);
        var c, r, $w, wgd;

        for (c = col2; c >= col1; c--) {
            for (r = row2; r >= row1; r--) {
                $w = this.is_widget(c, r);

                if ($w !== false) {
                    wgd = $w.data('coords').grid;
                    if (wgd.col >= col1 && wgd.col <= col2 &&
                        wgd.row >= row1 && wgd.row <= row2
                       ) {
                        $widgets = $widgets.add($w);
                    }
                }
            }
        }

        return $widgets;
    };


    fn.get_bottom_most_occupied_cell = function() {
        var row = 0;
        var col = 0;
        this.for_each_cell(function($el, c, r) {
            if ($el && r > row) {
                row = r;
                col = c;
            }
        });

        return {col: col, row: row};
    };


    fn.get_right_most_occupied_cell = function() {
        var row = 0;
        var col = 0;
        this.for_each_cell(function($el, c, r) {
            if ($el) {
                row = r;
                col = c;
                return false;
            }
        });

        return {col: col, row: row};
    };


    fn.for_each_cell = function(callback, gridmap) {
        gridmap || (gridmap = this.gridmap);
        var cols = gridmap.length;
        var rows = gridmap[1].length;

        cols_iter:
        for (var c = cols - 1; c >= 1; c--) {
            for (var r = rows - 1; r >= 1; r--) {
                var $el = gridmap[c] && gridmap[c][r];
                if (callback) {
                    if (callback.call(this, $el, c, r) === false) {
                        break cols_iter;
                    } else { continue; }
                }
            }
        }
    };


    fn.next_position_in_range = function(size_x, size_y, max_rows) {
        size_x || (size_x = 1);
        size_y || (size_y = 1);
        var ga = this.gridmap;
        var cols_l = ga.length;
        var valid_pos = [];
        var rows_l;

        for (var c = 1; c < cols_l; c++) {
            rows_l = max_rows || ga[c].length;
            for (var r = 1; r <= rows_l; r++) {
                var can_move_to = this.can_move_to({
                    size_x: size_x,
                    size_y: size_y
                }, c, r, max_rows);

                if (can_move_to) {
                    valid_pos.push({
                        col: c,
                        row: r,
                        size_y: size_y,
                        size_x: size_x
                    });
                }
            }
        }

        if (valid_pos.length >= 1) {
            return this.sort_by_col_asc(valid_pos)[0];
        }

        return false;
    };


    fn.closest_to_right = function(col, row) {
        if (!this.gridmap[col]) { return false; }
        var cols_l = this.gridmap.length - 1;

        for (var c = col; c <= cols_l; c++) {
            if (this.gridmap[c][row]) {
                return { col: c, row: row };
            }
        }

        return false;
    };


    fn.closest_to_left = function(col, row) {
        var cols_l = this.gridmap.length - 1;
        if (!this.gridmap[col]) { return false; }

        for (var c = col; c >= 1; c--) {
            if (this.gridmap[c][row]) {
                return { col: c, row: row };
            }
        }

        return false;
    };

}(jQuery, window, document));