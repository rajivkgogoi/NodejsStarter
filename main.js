var employee = require("./employee.js");
console.log(employee.firstname + " " + employee.lastname);
console.log(employee.address.city + ", " + employee.address.country);

//Lets require customer.js which in this case will represent class customer.
var Customer = require("./customer.js");
//Now lets create a new object of Customer class.
var objCustomer = new Customer();
console.log(objCustomer.customername);
console.log(objCustomer.location);
console.log(objCustomer.employeestrength);