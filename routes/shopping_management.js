var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var stwDao = require(global.base_dir + '/dao/stwDao');
var promise = require('promise');
router.use(cookieParser());

router.get('/store', function(req, res) {
    var pageData = {
        user_name: req.cookies.User
    }
    var item_count;
    html_string = stwDao.linecount("goods", function(item_count_result) {
        stwDao.itemlist(item_count_result, function(html_string) {
            pageData.item_list = html_string;
            res.render("01_Store", pageData);
        });
    });
});

// 함수 itemcount 를 실행해서 나온 결과가 item_count_result 이고,
// 다시 item_count_result 를 함수 itemlist 에 넣어서 실행한 결과가
// html_string 이다.
// itemlist 를 실행해서 나온 결과인 html_string 이 나와야만 하는 페이지는
// itemlist function 내에서 기술한다.



var GlobalVariable ="Test";

router.get('/cart', function(req, res) {
	var pageData = {
    	user_name : req.cookies.User,
    	html_contents : ''
	}

    var Goods = [{
		name: "스노우볼곰돌이",
		price: 16000
	}, {
	    name: "학사모곰돌이",
	    price: 10000
	}, {
	    name: "강아지학사모케이프",
	    price: 10000
	}, {
	    name: "야구점퍼",
	    price: 73000
	}, {
	    name: "둥근기둥기념패",
	    price: 120000
	}]





	var cart = req.cookies.cart;    // For the encryption of cookes,req.signedCookies.cart;
    if (!cart) {
        pageData.html_contents = `There is no item you have selected`
        res.render("02_Shopping-Cart", pageData);
	} else {
		var output ='';
		for(var id in cart){
			// console.log(id)
			// console.log(Goods[id-1].name)
			output += `<li>${Goods[id-1].name} (${cart[id]})</li>`;
			// }

		}
	}
	pageData.html_contents = `<ul>${output}</ul>`

    res.render("02_Shopping-Cart", pageData );
});


router.get('/cart/:id', function(req, res) {
    var id = req.params.id;
    if (req.cookies.cart) {
        var cart = req.cookies.cart;
    } else {
        var cart = {};
    }
    if (!cart[id]) {
        cart[id] = 0;
    }

    cart[id] = parseInt(cart[id]) + 1;
    res.cookie('cart', cart);
    res.redirect('/shop/cart');
    // res.render("02_Shopping-Cart", pageData );
});


router.get('/check_out', function(req, res) {
	var pageData = {
    	user_name : req.cookies.User
	}
    res.render("03_Check-Out", pageData );
});

router.get('/board', function(req, res) {
	var pageData = {
    	user_name : req.cookies.User
	}

    res.render("04_Board", pageData );
});

module.exports = router;