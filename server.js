//Lets require the http module which will take care of listening to HTTP requests on a defined port.
var http = require('http');

//Lets require the express module which will return a function that we will call
var express = require('express'),
    bodyParser = require('body-parser');

//Lets call express as a function which will return an application object that we can use as a callback.
var application = express();

// Setting the View Engine to Vash. "view engine" is the key.
application.set("view engine", "vash");
// Setting application to use body parser.
application.use(bodyParser());

// Lets set the public folder as static resources folder.
// __dirname points to the node.js physical project directory.
console.log(__dirname);
application.use(express.static(__dirname + "/public"));

var employeeController = require("./controllers/employeeController");
employeeController.init(application);

//Lets use the application object to do something on an HTTP GET request.
//application.get("/", function (req, res) {
    // We'll use the render method of the response object passing "index" as the filename(1st parameter)
    // and a javascript object literal as the 2nd parameter.
    // This object literal with firstname and lastname properties will be passed to the view to be used there.
  //  res.render("index", {firstname: "John", lastname: "Brosnan"});
//})

//Lets create our Web Server passing the application object.
var server = http.createServer(application)

// Make sure server is listening on port 8081.
server.listen(process.env.PORT || 8081);