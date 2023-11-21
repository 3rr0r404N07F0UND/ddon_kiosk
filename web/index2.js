const express = require("express");
const mysql = require("mysql");
const myApp = express();
const bodyParser = require("body-parser");
const dbConfig = require("../config/database.js");

myApp.use(bodyParser.urlencoded({ extended: true }));
myApp.use(express.static("../static"));
myApp.set("view engine", "pug");
myApp.set("views", "../views/pug");

myApp.get("/hello", (req, res) => {
  res.render("payment");
});

myApp.get("/admin", (req, res) => {
  res.render("admin");
});

myApp.post("/adminAccessPage", (req, res) => {
  const con = mysql.createConnection(dbConfig);
  if (req.body.adminPassword == 1234) {
    con.connect((err) => {
      if (err) throw err;
      console.log("CONNECTED!");

      let selectDateStart = req.body.selectDateStart;
      let selectDateEnd = req.body.selectDateEnd;

      if (selectDateStart && selectDateEnd) {
        console.log(selectDateStart, selectDateEnd);
        let mysql = `SELECT * FROM orderTable WHERE DATE(orderTime) >='${selectDateStart}' AND DATE(orderTime) <= '${selectDateEnd}'`;
        con.query(mysql, (err, result) => {
          //console.log(result);
          res.render("adminAccessPage", {
            result: result,
            date1: selectDateStart,
            date2: selectDateEnd,
          });
        });
      } else {
        let mysql = "SELECT * FROM orderTable";
        con.query(mysql, (err, result) => {
          let date2 = Date();
          console.log(result);
          res.render("adminAccessPage", {
            result: result,
          });
        });
      }
    });
  } else {
    res.redirect("/admin");
  }
});

myApp.get("/", (req, res) => {
  const con = mysql.createConnection(dbConfig);

  con.connect((err) => {
    if (err) throw err;
    console.log("DB CONNECTED!");

    let mysql1 =
      "SELECT imgUrl, foodTitle, foodDesc, foodInfo, allergyInfo, foodTop, foodPrice FROM menuTable WHERE foodType LIKE 1";
    let mysql2 =
      "SELECT imgUrl, foodTitle, foodDesc, foodInfo, allergyInfo, foodTop, foodPrice FROM menuTable WHERE foodType LIKE 2";
    let mysql3 =
      "SELECT imgUrl, foodTitle, foodDesc, foodInfo, allergyInfo, foodTop, foodPrice FROM menuTable WHERE foodType LIKE 3";
    let mysql4 =
      "SELECT imgUrl, foodTitle, foodDesc, foodInfo, allergyInfo, foodTop, foodPrice FROM menuTable WHERE foodType LIKE 4";
    let mysql5 =
      "SELECT imgUrl, foodTitle, foodDesc, foodInfo, allergyInfo, foodTop, foodPrice FROM menuTable WHERE foodType LIKE 4";
    con.query(mysql1, (err, result1) => {
      con.query(mysql2, (err, result2) => {
        con.query(mysql3, (err, result3) => {
          con.query(mysql4, (err, result4) => {
            con.query(mysql5, (err, result5) => {
              console.log(result1);
              res.render("testing", {
                setMenuList: result1,
                noodleMenuList: result2,
                singMenuList: result3,
                alcoholMenuList: result4,
                sodaMenuList: result5,
              });
            });
          });
        });
      });
    });
  });
});

myApp.get("/payment", (req, res) => {
  //const con = mysql.createConnection(dbConfig);
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
    let sql = `SELECT * FROM memberTable WHERE phoneNumber LIKE '010-9500-9987'`;
    con.query(sql, (err, result) => {
      console.log(result);
      res.json({ testing: result });
    });
  });
});

myApp.listen(8000, () => {
  console.log("8000!!!!!");
});
