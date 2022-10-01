const fs = require("fs");

var posts = [];
var categories = [];


module.exports.initialize = function () {

    var promise = new Promise((resolve, reject) => {
       
        try {

            fs.readFile('./data/posts.json', (err, data) => {
                if (err) throw err;

                employees = JSON.parse(data);
                console.log("INITIALIZE - load posts.");
            })

            fs.readFile('./data/categories.json', (err, data) => {
                if (err) throw err;

                categories = JSON.parse(data);
                console.log("INITIALIZE - load categories.");
            })

        } catch (ex) {
                      console.log("INITIALIZE - FAILURE.");
                      reject("INITIALIZE - FAILURE.");
                     }
        console.log("INITIALIZE - SUCCESS.");
        resolve("INITIALIZE - SUCCESS.");
    })

    return promise;
};


module.exports.getAllPosts = function () {

    var promise = new Promise((resolve, reject) => {
        
       //employees = [];
       if(posts.length === 0) {
        var err = "getAllPosts() does not have any data.";
        reject({message: err});
       }  

    resolve (posts);
    })
    return promise;
};


module.exports.getPublishedPosts = function () {

    var Pposts = [];
    var promise = new Promise((resolve, reject) => {
      
       for (var i=0; i < posts.length; i++){
           if (posts[i].isPpost == true) {
           Pposts.push(posts[i]);
           }
       }

       if(Pposts.length === 0) {
        var err = "getManagers() does not have any data.";
        reject({message: err});
       }  

    resolve (Pposts);
    })
    return promise;
};


module.exports.getCategories = function () {

    var promise = new Promise((resolve, reject) => {
        //departments = []; //to test errors
        if(categories.length === 0) {
         var err = "getCategories() does not have any data.";
         reject({message: err});
        }  
 
     resolve (categories);
     })
     return promise;
};
