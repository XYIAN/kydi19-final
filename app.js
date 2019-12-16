const express = require("express");
const mysql   = require("mysql");
const sha256  = require("sha256");
const session = require('express-session');
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public")); //folder for images, css, js
app.use(express.urlencoded()); //use to parse data sent using the POST method
app.use(session({ secret: 'any word', cookie: { maxAge: 180000 }}))

// routes
app.get("/", function(req, res)
{
    res.render("login");
    console.log("it works");
    
});//END ROOT ROUTE

app.get("/homePage", function(req, res){
    
    res.render("homePage");
    console.log("homepage hit"); 
});//END HOME PAGE


// function getDrinkResults(temp, name)
// {
//     let conn = dbConnection();
//     return new Promise(function(resolve, reject){
//         conn.connect(function(err) {
//           if (err) throw err;
//           console.log("Connected!");
//           let params = [];
//           let sql = `SELECT * FROM proj_drinks
//                       WHERE 
//                       name LIKE '%${name}%'`;
            
//           if (temp) { //user selected a category
//               sql += " AND temp = ?"; //To prevent SQL injection, SQL statement shouldn't have any quotes.
//               params.push(temp);
//           }
//           console.log("SQL:", sql)
//           conn.query(sql, params, function (err, rows, fields) {
//               if (err) throw err;
//               //res.send(rows);
//               conn.end();
//               resolve(rows);
//           });
//         });//connect
//     });//promise `
// }

//functions
function dbConnection(){

   let conn = mysql.createConnection({
                 host: "cst336db.space",
                 user: "cst336_dbUser9",
             password: "1zglno",
             database: "cst336_db9"
       }); //createConnection

return conn;

}

//starting the server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Express server is running ...."); 
});

