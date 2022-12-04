//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require('https');
const { url } = require("inspector");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get('/', (req, res) => {

  res.sendFile(__dirname + "/signup.html");
  });


  app.post("/", function(req, res){
   const firstName = req.body.fName;
   const lasttName = req.body.lName;
   const email = req.body.email;
   
   const data = {
    members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lasttName
          }
        }    
    ]
   }
    
   const jsonData = JSON.stringify(data);

   const url = "https://us21.api.mailchimp.com/3.0/lists/d4adb21bde"

   const options = {
     method: "POST",
     auth: "Zeus1:cf8a5200f0f4c44af2446d2104dbcc5f-us21"
   }

   const request = https.request(url, options, function(response){

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }


     response.on("data", function(data){
       console.log(JSON.parse(data));
     })
   })
    
   request.write(jsonData);
   request.end();

  });


  app.post("/failure", function(req, res){
   res.redirect("/")
  })  

app.listen(process.env.PORT || 3000, function(){
    console.log("server started on port 3000");
  });


// API Key
// cf8a5200f0f4c44af2446d2104dbcc5f-us21

// List Id
// d4adb21bde

