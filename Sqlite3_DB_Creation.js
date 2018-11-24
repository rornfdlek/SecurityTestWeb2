var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/stw.db');
// http://blog.habonyphp.com/entry/HTML-%ED%94%84%EB%A0%88%EC%9E%84-%ED%83%9C%EA%B7%B8#.WMCr72_yga8
db.serialize(function() {
  db.run("CREATE TABLE user (sql integer primary key autoincrement, user_name TEXT, e_mail_address TEXT, password TEXT)");
  db.run("INSERT INTO user VALUES(null, 'wishfree', 'wishfree@empas.com', 'dideodlf')");
  db.run("INSERT INTO user VALUES(null, 'diyang', 'diyang@korea.com', 'qwer1234')");
  db.run("INSERT INTO user VALUES(null, '신수연', 'ssy@sy.com', 'tndus')");

  db.run("CREATE TABLE goods (sql integer primary key autoincrement, item_name TEXT, item_price INTIGER, item_image TEXT, item_description TEXT)");

  db.run("INSERT INTO goods VALUES(null,\
     '스노우볼곰돌이', \
     16000, \
     '../Images/items/snowball.JPG',\
     '지름 약 6 cm, 높이 약 8.2 cm. 이화곰돌이가 야구점퍼를 입고 A+공책을 들고 있는 스노우볼입니다. 스노우볼을 흔들면 글리터가 예쁘게 흩날립니다. 수작업으로 채색하였기 때문에 제품마다 채색에 약간의 차이가 있을 수 있습니다. 선물용으로도 좋습니다. 유리와 도자기 재질로 제작되었습니다.')");

  db.run("INSERT INTO goods VALUES(null,\
     '학사모곰돌이', \
     10000, \
     '../Images/items/haksamo.JPG',\
     '학사모를 쓴 곰돌이입니다. 가운에 EWHA.W.UNIV.가 새겨져 있습니다. 졸업장을 들고 있습니다. 곰돌이 얼굴은 재봉과정으로 인해 각자 약간의 차이가 있으므로 양해 부탁드립니다.')");

  db.run("INSERT INTO goods VALUES(null,\
     '강아지학사모케이프', \
     10000, \
     '../Images/items/haksamodog.JPG',\
     '학사모 사이즈 약 10.5 cm x 10.5 cm. 케이프 총 길이 S 약 45 cm, M 약 61 cm. 강아지 학사모와 케이프 세트입니다. 학사모 리본 끈에 학교 영문명이 프린트 되어 있으며, 케이프 뒷면에 영문명이 자수로 새겨져 있습니다.')");

  db.run("INSERT INTO goods VALUES(null,\
     '야구점퍼', \
     73000, \
     '../Images/items/yajam.JPG',\
     '색상 옵션: 녹색, 핑크, 검정, 회색, 하늘색. 기념품을 구매하시기 전에 색상 및 사이즈 등의 상품정보를 꼼꼼히 확인해 주세요. 모니터의 색상차이로 인한 교환 및 반품은 불가합니다. 상품에 문제가 있거나 이화 생협의 착오로 인한 경우를 제외하고 배송비는 구매자 부담입니다.')");

  db.run("INSERT INTO goods VALUES(null,\
     '둥근기둥기념패', \
     120000, \
     '../Images/items/kinyeompae.JPG',\
     '선물용이나 기념용으로 사용할 수 있는 기념패입니다. 크리스탈 면적이 넓어 문구가 시원스럽게 들어가는 것이 특징입니다. 크리스탈에 새길 문구는 ewhacoop@ewha.ac.kr 로 보내셔야하고 추가비용은 없습니다.')");


  db.run("CREATE TABLE user_account (sql integer primary key autoincrement, user_name TEXT, user_money INTIGER)");
  db.run("INSERT INTO user_account VALUES(null, 'wishfree', 10000000)");
  db.run("INSERT INTO user_account VALUES(null, '신수연', 10000000)");

  db.run("CREATE TABLE board (sql integer primary key autoincrement, title TEXT, writer TEXT, contents TEXT, attachement TEXT, date TEXT, count INTIGER)");
  db.run("INSERT INTO board VALUES(null, 'document_1', 'wishfree', 'This article is for a test', 'yes', '2017-03-17', 2)");
  db.run("INSERT INTO board VALUES(null, 'document_2', 'diyang', 'My name is yang dae-il. This article is the one that is for a test.', 'yes', '2017-03-16', 4)");

  db.run("CREATE TABLE board_attachment (sql integer primary key autoincrement, board_doc_number INTIGER, filename TEXT, filepath TEXT)");

  db.run("INSERT INTO board_attachment VALUES(null, 2, 'test.jpg', '/public/uploads/test.png')");

});

  // var stmt = db.prepare("INSERT INTO user VALUES (?,?)");
  // for (var i = 0; i < 10; i++) {

  // var d = new Date();
  // var n = d.toLocaleTimeString();
  // stmt.run(i, n);
  // }
  // stmt.finalize();

  // db.each("SELECT id, dt FROM user", function(err, row) {
  //     console.log("User id : "+row.id, row.dt);
  // });






// Run SQL Query
// Database#run(sql, [param, ...], [callback])

// Runs the SQL query with the specified parameters and calls the callback afterward. It does not retrieve any result data. The function returns the Database object for which it was called to allow for function chaining.

// Name	Description
// sql	The SQL query to run. If the SQL query is invalid and a callback was passed to the function, it is called with an error object containing the error message from SQLite. If no callback was passed and preparing fails, an error event will be emitted on the underlying Statement object.
// param, ... (optional)	When the SQL statement contains placeholders, you can pass them in here. They will be bound to the statement before it is executed. There are three ways of passing bind parameters: directly in the function's arguments, as an array, and as an object for named parameters.
// Runs SQL query with specified parameters
// Database#get(sql, [param, ...], [callback])
// Runs the SQL query with the specified parameters and calls the callback with the first result row afterward. The function returns the Database object to allow for function chaining.

// Database#all(sql, [param, ...], [callback])
// Runs the SQL query with the specified parameters and calls the callback with all result rows afterward. The function returns the Database object to allow for function chaining.

// Database#each(sql, [param, ...], [callback], [complete])
// Runs the SQL query with the specified parameters and calls the callback with for each result row. The function returns the Database object to allow for function chaining.

// Runs SQL queries in the supplied string
// Database#exec(sql, [callback])
// Runs all SQL queries in the supplied string. No result rows are retrieved. The function returns the Database object to allow for function chaining. If a query fails, no subsequent statements will be executed.

// Preparing SQL statement
// Database#prepare(sql, [param, ...], [callback])
// Prepares the SQL statement and optionally binds the specified parameters and calls the callback when done. The function returns a Statement object.

// Statement#bind([param, ...], [callback])
// Binds parameters to the prepared statement and calls the callback when done or when an error occurs. The function returns the Statement object to allow for function chaining. The first and only argument to the callback is null when binding was successful, otherwise it is the error object.

// Statement#reset([callback])
// Resets the row cursor of the statement and preserves the parameter bindings. Use this function to re-execute the same query with the same bindings. The function returns the Statement object to allow for function chaining. The callback will be called after the reset is complete.

// Statement#finalize([callback])
// Finalizes the statement. This is typically optional, but if you experience long delays before the next query is executed, explicitly finalizing your statement might be necessary. This might be the case when you run an exclusive query (see section Serialization).

// Statement#run([param, ...], [callback])
// Binds parameters and executes the statement. The function returns the Statement object to allow for function chaining.

// Statement#get([param, ...], [callback])
// Binds parameters, executes the statement and retrieves the first result row. The function returns the Statement object to allow for function chaining.

// Statement#all([param, ...], [callback])
// Binds parameters, executes the statement and calls the callback with all result rows. The function returns the Statement object to allow for function chaining.

// Statement#each([param, ...], [callback], [complete])
// Binds parameters, executes the statement and calls the callback for each result row. The function returns the Statement object to allow for function chaining

// //Load modules
// var sqlite3         =       require('sqlite3').verbose();
// var db              =       new sqlite3.Database('./database_name.db');

// //Perform SELECT Operation
// db.all("SELECT * from blah blah blah where this="+that,function(err,rows){
// //rows contain values while errors, well you can figure out.
// });

// //Perform INSERT operation.
// db.run("INSERT into table_name(col1,col2,col3) VALUES (val1,val2,val3)");

// //Perform DELETE operation
// db.run("DELETE * from table_name where condition");

// //Perform UPDATE operation
// db.run("UPDATE table_name where condition");
