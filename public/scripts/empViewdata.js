(function (angular) {
    // Lets create a module named empViewdata and the 2nd parameter is an empty array where
    // we can define any dependencies that this module needs. Empty means our module has
    // no dependencies.
    var module = angular.module("empViewdata", []);

    // Create the controller and the 2nd parameter will be an array.
    // This array will have a variable named $scope, which is nothing but the viewmodel.
    // the viewmodel $scope will have the properties that the view needs.
    module.controller("empController", ["$scope", "$http",
        function ($scope, $http) {
            $scope.newEmployee = { empName: "" };

            $http.get("/api/employee")
                 .then(function (result) {
                     $scope.employees = result.data;
                 },
                 function (error) {
                     // Do something with the error
                     alert("error");
                 });
            // Call REST api to create employee
            // $scope.newEmployee is the model object, this model object contains properties
            // attributed with ng-model in the view elements.
            // In our case, we have 1 property newEmployee.empName in the model properties collection.
            $scope.create = function () {
                $http.post("/api/employee", $scope.newEmployee)
                     .then(function (result) {
                         //$scope.employees = result.data;
                         $scope.employees.push(result.data);
                     })
            };
        }
    ])
})(window.angular);   