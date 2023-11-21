"use strict";

var express = require("express");

var mysql = require("mysql");

var myApp = express();

var bodyParser = require("body-parser");

var dbConfig = require("../config/database.js");

myApp.use(bodyParser.urlencoded({
  extended: true
}));
myApp.use(express["static"]("../static"));
myApp.set("view engine", "pug");
myApp.set("views", "../views/pug");
myApp.get("/", function (req, res) {
  res.render("indexPage");
});
myApp.get("/admin", function (req, res) {
  res.render("admin");
});
myApp.post("/adminAccessPage", function (req, res) {
  var con = mysql.createConnection(dbConfig);
  con.connect(function (err) {
    if (err) throw err;
    var passwordSql = "SELECT phoneNumber FROM memberTable WHERE id LIKE 0";
    con.query(passwordSql, function (err, result) {
      console.log(result);
      var passwordOwn = result[0].phoneNumber;

      if (req.body.adminPassword == passwordOwn) {
        console.log("CONNECTED!");
        var selectDateStart = req.body.selectDateStart;
        var selectDateEnd = req.body.selectDateEnd;

        if (selectDateStart && selectDateEnd) {
          console.log(selectDateStart, selectDateEnd);

          var _mysql = "SELECT orderHistory, membershipNumber, FORMAT(totalPrice, 0) AS totalPrice FROM orderTable WHERE DATE(orderTime) >='".concat(selectDateStart, "' AND DATE(orderTime) <= '").concat(selectDateEnd, "'");

          var sqlSum = "SELECT FORMAT(SUM(totalPrice), 0) AS totalPrice FROM orderTable where DATE(orderTime) >= '".concat(selectDateStart, "' AND DATE(orderTime) <= '").concat(selectDateEnd, "'");
          con.query(_mysql, function (err, result) {
            con.query(sqlSum, function (err, result2) {
              //console.log(result);
              console.log(result2[0].totalPrice);
              res.render("adminAccessPage", {
                result: result,
                totalPrice: result2[0].totalPrice,
                date1: selectDateStart,
                date2: selectDateEnd
              });
            });
          });
        } else {
          var _mysql2 = "SELECT orderHistory, membershipNumber, FORMAT(totalPrice, 0) AS totalPrice FROM orderTable";
          var _sqlSum = "SELECT FORMAT(SUM(totalPrice), 0) AS totalPrice FROM orderTable";
          con.query(_mysql2, function (err, result) {
            console.log(result);
            con.query(_sqlSum, function (err, result2) {
              var date2 = Date();
              res.render("adminAccessPage", {
                totalPrice: result2[0].totalPrice,
                result: result
              });
            });
          });
        }
      } else {
        res.redirect("/admin");
      }
    });
  });
});
myApp.get("/order", function (req, res) {
  var con = mysql.createConnection(dbConfig);
  con.connect(function (err) {
    if (err) throw err;
    console.log("DB CONNECTED!");
    var mysql1 = "SELECT id, imgUrl, foodTitle, foodDesc, foodInfo, allergyInfo, foodTop, foodSpicy, FORMAT(foodPrice, 0) AS 'foodPrice' FROM menuTable WHERE foodType LIKE 1";
    var mysql2 = "SELECT id, imgUrl, foodTitle, foodDesc, foodInfo, allergyInfo, foodTop, foodSpicy, FORMAT(foodPrice, 0) AS 'foodPrice' FROM menuTable WHERE foodType LIKE 2";
    var mysql3 = "SELECT id, imgUrl, foodTitle, foodDesc, foodInfo, allergyInfo, foodTop, foodSpicy, FORMAT(foodPrice, 0) AS 'foodPrice' FROM menuTable WHERE foodType LIKE 3";
    var mysql4 = "SELECT id, imgUrl, foodTitle, foodDesc, foodInfo, allergyInfo, foodTop, foodSpicy, FORMAT(foodPrice, 0) AS 'foodPrice' FROM menuTable WHERE foodType LIKE 4";
    var mysql5 = "SELECT id, imgUrl, foodTitle, foodDesc, foodInfo, allergyInfo, foodTop, foodSpicy, FORMAT(foodPrice, 0) AS 'foodPrice' FROM menuTable WHERE foodType LIKE 5";
    con.query(mysql1, function (err, result1) {
      con.query(mysql2, function (err, result2) {
        con.query(mysql3, function (err, result3) {
          con.query(mysql4, function (err, result4) {
            con.query(mysql5, function (err, result5) {
              res.render("order", {
                setMenuList: result1,
                setMenuListLength: result1.length,
                noodleMenuList: result2,
                noodleMenuListLength: result2.length,
                singleMenuList: result3,
                singleMenuListLength: result3.length,
                sodaMenuList: result4,
                sodaMenuListLength: result4.length,
                alcoholMenuList: result5,
                alcoholMenuListLength: result5.length
              });
            });
          });
        });
      });
    });
  });
});
myApp.get("/testing", function (req, res) {
  res.render("testing.pug");
});
myApp.post("/ajaxPoint", function (req, res) {
  var con = mysql.createConnection(dbConfig);
  con.connect(function (err) {
    if (err) {
      console.log(err);
      throw err;
    }

    var sql = "INSERT INTO membertable (phoneNumber, point) VALUES ('".concat(req.body.phoneNumber, "',0)");
    con.query(sql, function (err, result) {
      sql = "SELECT FORMAT(point, 0) AS point FROM membertable WHERE phoneNumber LIKE '".concat(req.body.phoneNumber, "'");
      con.query(sql, function (err, result2) {
        console.log(result2);
        res.json({
          testing: result2
        });
      });
    });
  });
});
myApp.post("/receipt", function (req, res) {
  var con = mysql.createConnection(dbConfig);
  var orderHistory = "[".concat(req.body.orderHistory, "]");
  console.log(req.body.pointUse);
  console.log(req.body.totalPrice);
  var pointUse = Number(req.body.pointUse);
  var totalPrice = req.body.totalPrice.replace(/,/g, "");
  var pointValue = Number(totalPrice);
  pointValue = Math.floor((pointValue - pointUse) * 0.1);
  var sql = "INSERT INTO orderTable (orderHistory, totalPrice, membershipNumber) VALUES ('".concat(orderHistory, "', '").concat(totalPrice, "', '").concat(req.body.phoneNumber, "')");
  con.query(sql, function (err, result) {
    console.log(result);
  });

  if (req.body.phoneNumber.length != 0) {
    var memSql = "UPDATE memberTable SET point = point - ".concat(pointUse, " + ").concat(pointValue, " WHERE phoneNumber = '").concat(req.body.phoneNumber, "'");
    con.query(memSql, function (err, result) {
      console.log(result);
    });
  }

  var sqlOrder = "SELECT * FROM orderTable";
  con.query(sqlOrder, function (err, result) {
    console.log(result[result.length - 1]);
    var orderInfo = result[result.length - 1];
    console.log(orderInfo.totalPrice);
    res.render("receipt", {
      orderInfo: orderInfo,
      pointUse: req.body.pointUse,
      pointValue: pointValue
    });
  });
}); //myApp.post("/addDb", (req, res) => {
//  //console.log(req.body.orderHistory, req.body.phoneNumber, req.body.totalPrice);
//  const con = mysql.createConnection(dbConfig);
//  let orderHistory = `[${req.body.orderHistory}]`;
//  let totalPrice = req.body.totalPrice.replace(/,/g, "");
//  let pointValue = Number(totalPrice);
//  let pointUse = Number(req.body.pointUse);
//  pointValue = (pointValue - pointUse) * 0.1;
//  let sql = `INSERT INTO orderTable (orderHistory, totalPrice, membershipNumber) VALUES ('${orderHistory}', '${totalPrice}', '${req.body.phoneNumber}')`;
//  con.query(sql, (err, result) => {
//    console.log(result);
//  });
//
//  if (req.body.phoneNumber.length != 0) {
//    let memSql = `UPDATE memberTable SET point = point - ${pointUse} + ${pointValue} WHERE phoneNumber = '${req.body.phoneNumber}'`;
//    con.query(memSql, (err, result) => {
//      console.log(result);
//    });
//  }
//  res.redirect("/");
//});

myApp.post("/addDb", function (req, res) {
  var con = mysql.createConnection(dbConfig);
  var orderHistory = "[".concat(req.body.orderHistory, "]");
  var pointUse = Number(req.body.pointUse);
  var totalPrice = req.body.totalPrice.replace(/,/g, "");
  var pointValue = Number(totalPrice);
  pointValue = Math.floor((pointValue - pointUse) * 0.1);
  var sql = "INSERT INTO orderTable (orderHistory, totalPrice, membershipNumber) VALUES ('".concat(orderHistory, "', '").concat(totalPrice, "', '").concat(req.body.phoneNumber, "')");
  con.query(sql, function (err, result) {
    console.log(result);
  });

  if (req.body.phoneNumber.length != 0) {
    var memSql = "UPDATE memberTable SET point = point - ".concat(pointUse, " + ").concat(pointValue, " WHERE phoneNumber = '").concat(req.body.phoneNumber, "'");
    con.query(memSql, function (err, result) {
      console.log(result);
    });
  }

  var sqlOrder = "SELECT * FROM orderTable";
  con.query(sqlOrder, function (err, result) {
    console.log(result[result.length - 1]);
    var orderInfo = result[result.length - 1];
    res.render("receiptNone", {
      orderInfo: orderInfo,
      pointUse: pointUse,
      pointValue: pointValue
    });
  });
});
myApp.listen(4212, function () {
  console.log("4212!!!!!");
});