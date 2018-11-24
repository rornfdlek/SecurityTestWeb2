"use strict";
var path = require('path');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var guid = require('guid');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var boardDao = require(global.base_dir + '/dao/bordDao');
var gradeDao = require(global.base_dir + '/dao/gradeDao');


var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,  __dirname + '/../public/uploads/')
    },
    filename: function (req, file, cb) {
        // cb(null, file.fieldname + '-' + Date.now())
        cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));
router.use(cookieParser());


router.get('/list', function(req, res, next) {
	var pageData = {
    	user_name : req.cookies.User,
	}
    var html_string = '';
    // var item_count;
    html_string = boardDao.linecount("board", function(item_count_result) {
    	// console.log(item_count_result);
        boardDao.boardmessagelist(item_count_result, function(html_string) {
            pageData.message_list = html_string;
            res.render("./04_Board_List", pageData);
        });
    });
});

router.get('/about', function(req, res) {
    var pageData = {
        user_name : req.cookies.User
    }
    res.render("04_About", pageData );
});


router.get('/grade', function(req, res, next) {
    var pageData = {
        user_name : req.cookies.User
    }
    var html_string = '';
    // var item_count;
    html_string = gradeDao.linecount("grade", function(item_count_result) {
        // console.log(item_count_result);
        gradeDao.boardmessagelist(item_count_result, function(html_string) {
            pageData.message_list = html_string;
            res.render("./05_Grade", pageData);
        });
    });
    //res.render("05_Grade", pageData );
});

router.get('/read/:message_number', function(req, res, next) {
	var pageData = {
    	user_name : req.cookies.User
        // message_num : 0
	}
	// res.send(req.params.message_number);
    var html_string = '';
    var message_num = req.params.message_number;
    pageData.message_num = message_num;
    html_string = boardDao.boardmessageread(message_num, function(html_string) {
            pageData.message_content = html_string;
            res.render("./04_Board_Read", pageData);
    });
});

router.get('/write', function(req, res, next) {
	var pageData = {
    	user_name : req.cookies.User,
	}
	res.render("./04_Board_Write", pageData);
});

router.post('/write', upload.any(), function(req, res, next) {
    var pageData = {
        user_name : req.cookies.User,
    };
    var attachment_count = req.files.length;
    var message_guid = guid.create().value;

    ////////////////////////////////////////////////////////////////////////
    boardDao.boardmessagewrite(message_guid, req.cookies.User, "test", req.body.N_Message_Title, req.body.smarteditor, attachment_count, req.files);
    res.redirect("/bord/list");
});

router.get('/delete/:message_number', function(req, res, next) {
    var pageData = {
        user_name: req.cookies.User,
    }
    var message_num = req.params.message_number;

    boardDao.messagedelete(message_num);

    res.redirect("/bord/list");

});
module.exports = router;