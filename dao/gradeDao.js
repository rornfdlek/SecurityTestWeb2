var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(global.base_dir + '/Database/grade.db');
var _ = require('underscore');
var utils = require(global.base_dir + '/utils/utils');

exports.linecount = function(tablename, callback) {
    var row_count = 0;
    var row_JSON;

    db.all("SELECT count(*) AS Row_Count FROM " + tablename, function(err, rows) {
        row_JSON = _.first(rows);
        row_count = row_JSON.Row_Count;
        callback(row_count);
    });
}

exports.boardmessagelist = function(message_db_count, callback) {
    var html_string = '';
    var message_count = 0;

    db.each("SELECT stunum, major, name, grade From grade order by \"sql\" desc", function(err, row) {
        // row.item_price = utils.numberWithCommas(row.item_price);
        // console.log(row);
        html_string += `<tr>
        <td class="num">${row.stunum}</td>
        <td>${row.major}</td>
        <td>${row.name}</td>
        <td>${row.grade}</td>
        </tr>`;

        // console.log(html_string);
        message_count += 1;
        if (message_count == message_db_count) {
            callback(html_string);
        };
    });
}