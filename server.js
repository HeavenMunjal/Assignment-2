
/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Heavendeep Kaur Munjal Student ID: 161875216 Date: _30 september,2022_____
*
*  Online (Cyclic) Link: ________________________________________________________
*
********************************************************************************/ 



var express = require("express");
var path = require("path");
var blogSrv = require("./blog-service.js");

var app = express();
app.use(express.static('main/css')); //to recognize the css files


var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}


app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname,"/views/about.html"));
  });


  
  
  app.get("/posts", function(req,res){
    blogSrv.getAllPosts()
                             .then((data) => {
                               console.log ("getAllPosts JSON.");
                               res.json(data);
                             })
                             .catch((err) => {
                               console.log(err);
                               res.json(err);
                             })
  });
  
  app.get("/Published Posts", function(req,res){
    blogSrv.getPublishedPosts()
                             .then((data) => {
                               console.log ("getPublishesPosts JSON.");
                               res.json(data);
                             })
                             .catch((err) => {
                               console.log(err);
                               res.json(err);
                             })
  });
  
  app.get("/categories", function(req,res){
   
   blogSrv.getCategories()
                           .then((data) => {
                               console.log ("getCategories JSON.");
                               res.json(data);
                           })
                           .catch((err) => {
                               console.log(err);
                               res.json(err);
                           })
  });
  
  app.use(function (req, res) {
    res.status(404).sendFile(path.join(__dirname,"/views/error404.html"));
  })
  

//Call initialize method from blog-service.js

console.log ("Ready for initialize");
blogSrv.initialize()
                    .then(() => {
                          console.log ("initialize.then");
                          app.listen(HTTP_PORT, onHttpStart);  //start the server 
                    })
                    .catch(err => {
                          console.log(err);
                    })
 