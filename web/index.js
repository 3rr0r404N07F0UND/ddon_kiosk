const express = require("express");
const mysql = require("mysql");
const myApp = express();
const bodyParser = require("body-parser");
const dbConfig = require("../config/database.js");

myApp.use(bodyParser.urlencoded({ extended: true }));
myApp.use(express.static("../static"));
myApp.set("view engine", "pug");
myApp.set("views", "../views/pug");

myApp.get("/", (req, res) => {
  res.render("indexPage");
});

myApp.get("/admin", (req, res) => {
  res.render("admin");
});

myApp.post("/adminAccessPage", (req, res) => {
  const con = mysql.createConnection(dbConfig);
  con.connect((err) => {
    if (err) throw err;
    let passwordSql = "SELECT phoneNumber FROM membertable WHERE id LIKE 0";
    con.query(passwordSql, (err, result) => {
      console.log(result);
      let passwordOwn = result[0].phoneNumber;
      if (req.body.adminPassword == passwordOwn) {
        console.log("CONNECTED!");
        let selectDateStart = req.body.selectDateStart;
        let selectDateEnd = req.body.selectDateEnd;
        if (selectDateStart && selectDateEnd) {
          console.log(selectDateStart, selectDateEnd);
          let mysql = `SELECT orderHistory, membershipNumber, FORMAT(totalPrice, 0) AS totalPrice FROM ordertable WHERE DATE(orderTime) >='${selectDateStart}' AND DATE(orderTime) <= '${selectDateEnd}'`;
          let sqlSum = `SELECT FORMAT(SUM(totalPrice), 0) AS totalPrice FROM ordertable where DATE(orderTime) >= '${selectDateStart}' AND DATE(orderTime) <= '${selectDateEnd}'`;
          con.query(mysql, (err, result) => {
            con.query(sqlSum, (err, result2) => {
              //console.log(result);
              console.log(result2[0].totalPrice);
              res.render("adminAccessPage", {
                result: result,
                totalPrice: result2[0].totalPrice,
                date1: selectDateStart,
                date2: selectDateEnd,
              });
            });
          });
        } else {
          let mysql =
            "SELECT orderHistory, membershipNumber, FORMAT(totalPrice, 0) AS totalPrice FROM ordertable";
          let sqlSum =
            "SELECT FORMAT(SUM(totalPrice), 0) AS totalPrice FROM ordertable";
          con.query(mysql, (err, result) => {
            console.log(result);
            con.query(sqlSum, (err, result2) => {
              let date2 = Date();
              res.render("adminAccessPage", {
                totalPrice: result2[0].totalPrice,
                result: result,
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

myApp.get("/order", (req, res) => {
  const con = mysql.createConnection(dbConfig);

  con.connect((err) => {
    if (err) throw err;
    console.log("DB CONNECTED!");

    let mysql1 =
      "SELECT id, imgUrl, foodTitle, foodDesc, foodInfo, allergyInfo, foodTop, foodSpicy, FORMAT(foodPrice, 0) AS 'foodPrice' FROM menutable WHERE foodType LIKE 1";
    let mysql2 =
      "SELECT id, imgUrl, foodTitle, foodDesc, foodInfo, allergyInfo, foodTop, foodSpicy, FORMAT(foodPrice, 0) AS 'foodPrice' FROM menutable WHERE foodType LIKE 2";
    let mysql3 =
      "SELECT id, imgUrl, foodTitle, foodDesc, foodInfo, allergyInfo, foodTop, foodSpicy, FORMAT(foodPrice, 0) AS 'foodPrice' FROM menutable WHERE foodType LIKE 3";
    let mysql4 =
      "SELECT id, imgUrl, foodTitle, foodDesc, foodInfo, allergyInfo, foodTop, foodSpicy, FORMAT(foodPrice, 0) AS 'foodPrice' FROM menutable WHERE foodType LIKE 4";
    let mysql5 =
      "SELECT id, imgUrl, foodTitle, foodDesc, foodInfo, allergyInfo, foodTop, foodSpicy, FORMAT(foodPrice, 0) AS 'foodPrice' FROM menutable WHERE foodType LIKE 5";
    con.query(mysql1, (err, result1) => {
      con.query(mysql2, (err, result2) => {
        con.query(mysql3, (err, result3) => {
          con.query(mysql4, (err, result4) => {
            con.query(mysql5, (err, result5) => {
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
                alcoholMenuListLength: result5.length,
              });
            });
          });
        });
      });
    });
  });
});

myApp.get("/testing", (req, res) => {
  res.render("testing.pug");
});

myApp.post("/ajaxPoint", (req, res) => {
  const con = mysql.createConnection(dbConfig);
  con.connect((err) => {
    if (err) {
      console.log(err);
      throw err;
    }
    let sql = `INSERT INTO membertable (phoneNumber, point) VALUES ('${req.body.phoneNumber}',0)`;
    con.query(sql, (err, result) => {
      sql = `SELECT FORMAT(point, 0) AS point FROM membertable WHERE phoneNumber LIKE '${req.body.phoneNumber}'`;
      con.query(sql, (err, result2) => {
        console.log(result2);
        res.json({ testing: result2 });
      });
    });
  });
});

myApp.post("/receipt", (req, res) => {
  const con = mysql.createConnection(dbConfig);
  let orderHistory = `[${req.body.orderHistory}]`;
  console.log(req.body.pointUse);
  console.log(req.body.totalPrice);
  let pointUse = Number(req.body.pointUse);
  let totalPrice = req.body.totalPrice.replace(/,/g, "");
  let pointValue = Number(totalPrice);
  pointValue = Math.floor((pointValue - pointUse) * 0.1);

  let sql = `INSERT INTO ordertable (orderHistory, totalPrice, membershipNumber) VALUES ('${orderHistory}', '${totalPrice-pointUse}', '${req.body.phoneNumber}')`;
  con.query(sql, (err, result) => {
    console.log(result);
  });

  if (req.body.phoneNumber.length != 0) {
    let memSql = `UPDATE membertable SET point = point - ${pointUse} + ${pointValue} WHERE phoneNumber = '${req.body.phoneNumber}'`;
    con.query(memSql, (err, result) => {
      console.log(result);
    });
  }

  let sqlOrder = "SELECT * FROM ordertable";
  con.query(sqlOrder, (err, result) => {
    console.log(result[result.length - 1]);
    let orderInfo = result[result.length - 1];
    console.log(orderInfo.totalPrice);
    res.render("receipt", {
      orderInfo: orderInfo,
      pointUse: req.body.pointUse,
      pointValue: pointValue,
      totalPrice: totalPrice
    });
  });
});

//myApp.post("/addDb", (req, res) => {
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

myApp.post("/addDb", (req, res) => {
  const con = mysql.createConnection(dbConfig);
  let orderHistory = `[${req.body.orderHistory}]`;
  let pointUse = Number(req.body.pointUse);
  let totalPrice = req.body.totalPrice.replace(/,/g, "");
  let pointValue = Number(totalPrice);
  pointValue = Math.floor((pointValue - pointUse) * 0.1);

  let sql = `INSERT INTO ordertable (orderHistory, totalPrice, membershipNumber) VALUES ('${orderHistory}', '${totalPrice-pointUse}', '${req.body.phoneNumber}')`;
  con.query(sql, (err, result) => {
    console.log(result);
  });

  if (req.body.phoneNumber.length != 0) {
    let memSql = `UPDATE membertable SET point = point - ${pointUse} + ${pointValue} WHERE phoneNumber = '${req.body.phoneNumber}'`;
    con.query(memSql, (err, result) => {
      console.log(result);
    });
  }

  let sqlOrder = "SELECT * FROM ordertable";
  con.query(sqlOrder, (err, result) => {
    console.log(result[result.length - 1]);
    let orderInfo = result[result.length - 1];
    res.render("receiptNone", {
      orderInfo: orderInfo,
      pointUse: pointUse,
      pointValue: pointValue,
    });
  });
});

myApp.listen(4201, () => {
  console.log("4201!!!!!");
});
