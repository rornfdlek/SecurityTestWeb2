var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stwDao = require(global.base_dir + '/dao/stwDao');
// var fs = require('fs');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));
router.use(cookieParser());
// router.use(cookieParser('!QAZ2wsx'));

router.get('/login', function(req, res) {
  res.sendFile(global.base_dir + '/views/login.html');
});

router.post('/login', function(req, res) {
    var User_email = req.body.email;
    var Password = req.body.password;
    var user_name;

    stwDao.getLoginUserName(User_email, Password, function(user_name) {
        if (user_name == "Login_Failed") {
            console.log("Login_Failed");
        } else {
            res.cookie('User', user_name);
            res.redirect('/shop/store');
        }
    });
});

router.get('/sign_up', function(req, res) {
    res.sendFile(global.base_dir + '/views/sign-up.html');
});

router.post('/sign_up', function(req, res) {
    var user_name = req.body.usr_name;
    var user_email = req.body.email;
    var password = req.body.password;
    stwDao.signup(user_name, user_email, password, function() {
        res.redirect('/user/login');
    });
});

router.get('/log_out', function(req, res) {
    res.sendFile(global.base_dir + '/views/sign-up.html');
});

module.exports = router;