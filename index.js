"use strict";

var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var fs = require('fs');


global.base_dir = __dirname;
require('./global');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

var user_mgnt = require('./routes/user_management');
var shop_mgnt = require('./routes/shopping_management');
var bord_mgnt = require('./routes/board_management');

// // view engine setup
app.set('views', path.join(base_dir, '/views'));
app.engine('html', exphbs(require(__app.__setting.render_setting)));
app.set('view engine', 'html');


app.use('/user', user_mgnt);
app.use('/shop', shop_mgnt);
app.use('/bord', bord_mgnt);

app.get('/', function(req, res) {
	res.send("This is a test page to check whether the web server is functioning. connect to /user/login");
});

app.listen(9000, () => {
    console.log("Web server is running on port 9000!");
});
