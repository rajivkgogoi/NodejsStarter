(function (employeeController) {
    //By using employeeController as a parameter in the anonymous function
    // we are replacing it with module.exports so that we can start adding functions to it.
    // So we have a function named init which accepts an application parameter.
    // This application parameter will be passed from the server.js file, yes
    // the application object that we created using express library.
    employeeController.init = function (application) {

        // Mongoose connection - Start
        // Add mongoose library
        var mongoose = require('mongoose');

        // Connect to empdb database, if not exists, mongodb will create.
        mongoose.connect('mongodb://localhost/empdb');

        // define connection
        var db = mongoose.connection;
        db.on('error', console.error);
        db.once('open', function callback() {
            console.log('mongodb connection opened.');
        });

        // define schema and model
        var empSchema = mongoose.Schema({ name: String });
        var Employee = mongoose.model('Employee', empSchema);

        // Mongoose connection - End

        //Here we are doing the very same thing that we did in server.js 
        // routing a GET request to the root of the site "/" and returning the index.vash view
        application.get("/", function (req, res) {
            res.render("index");
        })
        application.get("/api/employee", function (req, res) {
            // Set response headers, content type to json
            res.set("Content-Type", "application/json");
            // Retrieve employees
            Employee.find(function (err, employees) {
                if (err) return console.error(err);
                // Send a json collection object back. 
                res.send(employees);
            });
        });
        // Handle POST request to create employee
        application.post("/api/employee", function (req, res) {
            // Create an employee
            // Get the employee name from the HTTP request body using req.body.empName
            var emp = new Employee({ name: req.body.empName });
            emp.save(function (err, emp) {
                if (err) return console.error(err);
                console.log(emp);
            });
            // Set response headers, content type to json
            res.set("Content-Type", "application/json");
            // Retrieve employees
            Employee.find(function (err, employees) {
                if (err) return console.error(err);
                // Send a json collection object back. 
                res.send(employees);
            //});

        });
    }
})(module.exports);