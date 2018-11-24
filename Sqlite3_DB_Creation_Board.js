var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/board.db');

db.serialize(function() {
  db.run("CREATE TABLE board (sql integer primary key autoincrement, messageguid TEXT, writer TEXT, category TEXT, title TEXT, contents TEXT, attachment INTIGER, date TEXT, count INTIGER)");
  db.run("CREATE TABLE board_attachment (sql integer primary key autoincrement, message_guid TEXT, filename TEXT, filesize INTIGER, filepath TEXT)");
});
