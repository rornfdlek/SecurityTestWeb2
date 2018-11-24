var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(global.base_dir + '/Database/STW.db');
var _ = require('underscore');
var utils = require(global.base_dir + '/utils/utils');
// var promise = require('promise');


exports.getLoginUserName = function(user_email, password, callback) {
    var user_name;
    var sql = "SELECT user_name, e_mail_address FROM user WHERE e_mail_address = '" + user_email + "' AND password = '" + password + "' ";
    db.each(sql, function(err, row) {
            if (user_email == row.e_mail_address) {
                user_name = row.user_name;
                callback (user_name);
            }
        },
        function(err, rows) {
            if (rows == 0) {
                user_name = "Login_Failed";
                callback (user_name);
            }
        });
}

exports.signup = function(user_name, user_email, password, callback) {
    var stmt = db.prepare("INSERT INTO user VALUES (null, ?, ?, ?)");
    stmt.run(user_name, user_email, password);
    stmt.finalize();
    callback();
}

exports.linecount = function(tablename, callback) {
    var row_count = 0;
    var row_JSON;

    db.all("SELECT count(*) AS Row_Count FROM " + tablename, function(err, rows) {
        row_JSON = _.first(rows);
        row_count = row_JSON.Row_Count;
        callback(row_count);
    });
}

exports.itemlist = function(item_db_count, callback) {
    var html_string = '';
    var item_count = 0;

    db.each("SELECT sql, item_name, item_price, item_image, item_description FROM goods", function(err, row) {
        row.item_price = utils.numberWithCommas(row.item_price);
        html_string += `<li id = "store_li"> <img class="image" src="${row.item_image}" />
        <h3 class="item_name">${row.item_name}</h3>
        <h3 class="item_price">${row.item_price} 원</h3>
        <a class="put_item_into_cart" href="/shop/cart/${row.sql}"> 장바구니 </a>
        <p>${row.item_description}</p>
        </li>`;
        item_count += 1;
        if (item_count == item_db_count) {
            callback(html_string);
        };
    });
}

// exports.cartitemlist = function(cart, callback) {
//     var html_string = '';
//     var item_count = 0;

//     for (var id in cart) {
//         // html_string += `<li>${id} (${cart[id]})</li>`;
//         html_string += cartiteminfo(id, function(html_string) {
//             return html_string;
//         });
//     }
//     callback(html_string);
// }
////////////////////////////////////////////////////////////////////
// exports.cartiteminfo = function(id) {
//     var html_string = '';

//     db.each("SELECT sql, item_name, item_price, item_image FROM goods where sql = '" + id + "'", function(err, row) {
//         row.item_price = utils.numberWithCommas(row.item_price);
//         html_string += `<li id = "store_li"> <img class="image" src="${row.item_image}" />
//                 <h3 class="item_name">${row.item_name}</h3>
//                 <h3 class="item_price">${row.item_price} 원</h3>
//                 </li>`;
//         console.log(html_string);
//         return (html_string);

//     });
// }

// exports.cartiteminfo = function(id, callback) {
//     return new promise(function(fullfilled, rejected) {
//         var html_string = '';
//         console.log("sto's i " + id)
//         db.each("SELECT sql, item_name, item_price, item_image FROM goods where sql = '"+ id + "'", function(err, row) {
//             html_string += `<li id = "store_li"> <img class="image" src="${row.item_image}" />
//                     <h3 class="item_name">${row.item_name}</h3>
//                     <h3 class="item_price">${row.item_price} 원</h3>
//                     </li>`;
//             fullfilled(html_string);
//         });
//     });
// }


exports.cartiteminfo = function(id, callback) {
        var html_string = '';

        db.each("SELECT sql, item_name, item_price, item_image FROM goods where sql = '"+ id + "'", function(err, row) {
            html_string += `<li id = "store_li"> <img class="image" src="${row.item_image}" />
                    <h3 class="item_name">${row.item_name}</h3>
                    <h3 class="item_price">${row.item_price} 원</h3>
                    </li>`;
            callback(html_string);
        });
}

// exports.waterfalltest_01 = function(num, callback) {
//     var test = 10;
//     test += num;
//     callback (test);

// }

// exports.waterfalltest_02 = function(test, callback) {
//     console.log(test);
//     // callback (test);

// }
exports.boardmessagelist = function(message_db_count, callback) {
    var html_string = '';
    var message_count = 0;

    db.each("SELECT \"sql\", title, writer, attachement, date, count From board", function(err, row) {
        // row.item_price = utils.numberWithCommas(row.item_price);
        // console.log(row);
        html_string += `<tr>
        <td class="num">${row.sql}</td>
        <td class="board-title">
            <a href="/bord/board_read/${row.sql}">${row.title}</a>
        </td>`;
        if (row.attachement == 'yes') {
            html_string += `<td><i class="fa fa-file"></i></td>`
        }
        else {
            html_string += `<td> </td>`
        };

        html_string += `<td>${row.writer}</td>
        <td class="num">${row.count}</td>
        <td class="num">${row.date}</td>
        </tr>`;

        // console.log(html_string);
        message_count += 1;
        if (message_count == message_db_count) {
            callback(html_string);
        };
    });
}
