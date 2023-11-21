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
myApp.get("/hello", function (req, res) {
  res.render("payment");
});
myApp.get("/admin", function (req, res) {
  res.render("admin");
});
myApp.post("/adminAccessPage", function (req, res) {
  var con = mysql.createConnection(dbConfig);

  if (req.body.adminPassword == 1234) {
    con.connect(function (err) {
      if (err) throw err;
      console.log("CONNECTED!");
      var selectDateStart = req.body.selectDateStart;
      var selectDateEnd = req.body.selectDateEnd;

      if (selectDateStart && selectDateEnd) {
        console.log(selectDateStart, selectDateEnd);

        var _mysql = "SELECT * FROM orderTable WHERE DATE(orderTime) >='".concat(selectDateStart, "' AND DATE(orderTime) <= '").concat(selectDateEnd, "'");

        con.query(_mysql, function (err, result) {
          //console.log(result);
          res.render("adminAccessPage", {
            result: result,
            date1: selectDateStart,
            date2: selectDateEnd
          });
        });
      } else {
        var _mysql2 = "SELECT * FROM orderTable";
        con.query(_mysql2, function (err, result) {
          var date2 = Date();
          console.log(result);
          res.render("adminAccessPage", {
            result: result
          });
        });
      }
    });
  } else {
    res.redirect("/admin");
  }
});
myApp.get("/", function (req, res) {
  var con = mysql.createConnection(dbConfig);
  con.connect(function (err) {
    if (err) throw err;
    console.log("DB CONNECTED!");
    var mysql1 = "SELECT imgUrl, foodTitle, foodDesc, foodInfo, allergyInfo, foodTop, foodPrice FROM menuTable WHERE foodType LIKE 1";
    var mysql2 = "SELECT imgUrl, foodTitle, foodDesc, foodInfo, allergyInfo, foodTop, foodPrice FROM menuTable WHERE foodType LIKE 2";
    var mysql3 = "SELECT imgUrl, foodTitle, foodDesc, foodInfo, allergyInfo, foodTop, foodPrice FROM menuTable WHERE foodType LIKE 3";
    var mysql4 = "SELECT imgUrl, foodTitle, foodDesc, foodInfo, allergyInfo, foodTop, foodPrice FROM menuTable WHERE foodType LIKE 4";
    var mysql5 = "SELECT imgUrl, foodTitle, foodDesc, foodInfo, allergyInfo, foodTop, foodPrice FROM menuTable WHERE foodType LIKE 4";
    con.query(mysql1, function (err, result1) {
      con.query(mysql2, function (err, result2) {
        con.query(mysql3, function (err, result3) {
          con.query(mysql4, function (err, result4) {
            con.query(mysql5, function (err, result5) {
              console.log(result1);
              res.render("testing", {
                setMenuList: result1,
                noodleMenuList: result2,
                singMenuList: result3,
                alcoholMenuList: result4,
                sodaMenuList: result5
              });
            });
          });
        });
      });
    });
  });
});
myApp.get("/payment", function (req, res) {//const con = mysql.createConnection(dbConfig);
  //con.connect((err) => {
  //if (err) throw err;
  //when the payment is made, need to get the values of order. Need to declare this part
  //and then insert the information into the orderTable.
  //let mysql = INSERT INTO orderTable (orderHistory, membershipTF, membershipNumber, packingTF) VALUES ?;
  //con.query();
  //});
});
/*
myApp.get("/member", (req, res) => {
  const con = mysql.createConnection(dbConfig);
  con.connect((err) => {
    if (err) throw err;

        need to add point values in memberTable
        need to declare the variables related to the order
        if the member already registered, no need to create new row (mySql can be skipped)
        let mySql = `INSERT INTO memberTable phoneNumber VALUES ${req.query.phoneNumber}` ;
        let mySql2= `INSERT INTO memberTable (memberPoints) VALUES ${req.query.phoneNumber}` ;

        in case the phoneNumber already exists, 
        let point = price of purchase * ( accumulating rate );
        let mySql= `UPDATE memberTable SET memberPoint = previous value + ${point} WHERE phoneNumber = '${req.query.phoneNumber}'` ;

        con.query(mySql, (err, result)=>{
            con.query(mySql2, (err, result)=>{});
        });
  });
});
*/

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

    var sql = "SELECT * FROM memberTable WHERE phoneNumber LIKE '010-9500-9987'";
    con.query(sql, function (err, result) {
      console.log(result);
      res.json({
        testing: result
      });
    });
  });
});
myApp.listen(8000, function () {
  console.log("8000!!!!!");
});