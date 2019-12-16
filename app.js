const express = require("express");
const mysql   = require("mysql");
const sha256  = require("sha256");
const session = require('express-session');
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public")); //folder for images, css, js
app.use(express.urlencoded()); //use to parse data sent using the POST method
app.use(session({ secret: 'any word', cookie: { maxAge: 180000 }}));
let score = 0 ; let attempts = 0; 
let email = "email" ;
// routes
app.get("/", function(req, res)
{
    res.render("homePage", {"score": score, 
        "attempts" : attempts, 
        "email"     : email
    });
   // console.log("homepage hit"); 
    score = req.query.score;
    email = req.query.email; 
    console.log("score:"+score); 
    console.log("email:"+email);
    
});//END ROOT ROUTE

app.get("/homePage", function(req, res){
    
    res.render("homePage", {"score": score, 
        "attempts" : attempts, 
        "email"     : email
    });
    console.log("homepage hit"); 
    //score = req.query.score;
    //email = req.query.email; 
    console.log("score:"+score); 
    console.log("email:"+email);
    
});//END HOME PAGE

app.get("/p1", function(req, res){
    // let email = await getEmail(); 
    // let score = req.query.score;
    // let email = req.query.email; 
    // console.log("score:"+score); 
    // console.log("email:"+email); 
    res.render("p1", {"score": score, 
        "attempts" : attempts, 
        "email"     : email
    });
    console.log("email : ", email); 
});


//functions ::::::::::::::::::::::::::::::::::::::
function dbConnection(){

   let conn = mysql.createConnection({
                 host: "cst336db.space",
                 user: "cst336_dbUser9",
             password: "1zglno",
             database: "cst336_db9"
       }); //createConnection

return conn;

}

function getInfo2(temp, name)//modified
{
    let conn = dbConnection();
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
          let params = [];
          let sql = `SELECT * FROM tableOne
                      WHERE 
                      name LIKE '%${name}%'`;
            
          if (temp) { //user selected a category
              sql += " AND temp = ?"; //To prevent SQL injection, SQL statement shouldn't have any quotes.
              params.push(temp);
          }
          console.log("SQL:", sql);
          conn.query(sql, params, function (err, rows, fields) {
              if (err) throw err;
              //res.send(rows);
              conn.end();
              resolve(rows);
          });
        });//connect
    });//promise `
}

function insert(body){
   
   let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
           console.log("Connected!");
        
           let sql = `INSERT INTO q_author
                        (firstName, lastName, sex)
                         VALUES (?,?,?)`;
        
           let params = [body.firstName, body.lastName, body.gender];
        
           conn.query(sql, params, function (err, rows, fields) {
              if (err) throw err;
              //res.send(rows);
              conn.end();
              resolve(rows);
           });
        
        });//connect
    });//promise 
}

function update(body){
   
   let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
           console.log("Connected!");
        
           let sql = `UPDATE q_author
                      SET firstName = ?, 
                          lastName  = ?, 
                                sex = ?
                     WHERE authorId = ?`;
        
           let params = [body.firstName, body.lastName, body.gender, body.authorId];
        
           console.log(sql);
           
           conn.query(sql, params, function (err, rows, fields) {
              if (err) throw err;
              //res.send(rows);
              conn.end();
              resolve(rows);
           });
        
        });//connect
    });//promise 
}



function deleteA(authorId){
   
   let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
           console.log("Connected!");
        
           let sql = `DELETE FROM q_author
                      WHERE authorId = ?`;
        
           conn.query(sql, [authorId], function (err, rows, fields) {
              if (err) throw err;
              //res.send(rows);
              conn.end();
              resolve(rows);
           });
        
        });//connect
    });//promise 
}
function getInfo(authorId){
   
   let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
           console.log("Connected!");
        
           let sql = `SELECT *
                      FROM q_author
                      WHERE authorId = ?`;
        
           conn.query(sql, [authorId], function (err, rows, fields) {
              if (err) throw err;
              //res.send(rows);
              conn.end();
              resolve(rows[0]); //Query returns only ONE record
           });
        
        });//connect
    });//promise 
}

function getList(){
   
   let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
           console.log("Connected!");
        
           let sql = `SELECT authorId, firstName, lastName 
                        FROM q_author
                        ORDER BY lastName`;
        
           conn.query(sql, function (err, rows, fields) {
              if (err) throw err;
              //res.send(rows);
              conn.end();
              resolve(rows);
           });
        
        });//connect
    });//promise 
}
//END FUNCTIONS::::::::::::::::::::::::::::::::::::::::::::::::

//starting the server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Express server is running ...."); 
});

