var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(global.base_dir + '/Database/board.db');
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

    db.each("SELECT \"sql\", title, attachment, writer, date, count From board order by \"sql\" desc", function(err, row) {
        // row.item_price = utils.numberWithCommas(row.item_price);
        // console.log(row);
        html_string += `<tr>
        <td class="num">${row.sql}</td>
        <td class="board-title">
            <a href="/bord/read/${row.sql}">${row.title}</a>
        </td>`;
        if (row.attachement == 0) {
            html_string += `<td> </td>`
        }
        else {
            html_string += `<td><i class="fa fa-file"></i></td>`
        };

        html_string += `<td>${row.writer}</td>
        <td class="num">${row.date}</td>
        <td class="num">${row.count}</td>
        </tr>`;

        // console.log(html_string);
        message_count += 1;
        if (message_count == message_db_count) {
            callback(html_string);
        };
    });
}

exports.boardmessageread = function(message_num, callback) {
    var html_string = '';

    db.each("SELECT \"sql\", title, contents, attachment, writer, date, count From board where  \"sql\" = " + message_num , function(err, row) {
        // console.log(row);

        html_string = `

    <h2 class="bg-primary" style="padding:8px 12px 12px 8px; border-radius: 0.12em"> &nbsp; ${row.title}</h2>
    <label class="control-label" for="Writer">Writer : </label>
    <span class="text-muted" id="Writer">${row.writer} </span>
    <label class="control-label" for="Date">&emsp; Date : </label>
    <span class="text-muted" id="Date">${row.date} </span>
    <hr style="margin-top: 10px; margin-bottom: 18px;">
    <p> ${row.contents} </p>
    <hr style="margin-top: 20px; margin-bottom: 12px;">
        `
        console.log(html_string)
        callback(html_string);

    });
}

/////////////////////////////////////////////////////////////////////////////

exports.boardmessagewrite = function(message_guid, message_writer, message_category, message_title, message_text, message_attachment_count, message_attach) {

    var attachment_count = message_attachment_count;
    // var attachment_YN = "yes";
    var yyyy_mm_dd = "";
    var d = new Date();
    // console.log(message_attach);
    // if (attachment_count ==0){
    //     attachment_YN = "no"
    // }

    console.log(message_attach)

    yyyy_mm_dd = utils.getFormatDate(d)
    var stmt = db.prepare("INSERT INTO board VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?)");
    stmt.run(message_guid, message_writer, message_category, message_title, message_text, message_attachment_count, yyyy_mm_dd, 0);
    stmt.finalize();

    var stmt = db.prepare("INSERT INTO board_attachment VALUES (null, ?, ?, ?, ?)");
    for (var i=0; i < attachment_count; i++){
         stmt.run(message_guid, message_attach[i].originalname, message_attach[i].size, message_attach[i].path);
    }
    stmt.finalize();
}

exports.messagedelete = function(message_num) {
    var stmt = db.prepare("DELETE FROM board WHERE \"sql\" = ?");
    stmt.run(message_num);
    stmt.finalize();
}