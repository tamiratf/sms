(function () {
    angular.module('App.FixedAsset.Department.Create', [
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'api.departments'
        ])
        .controller('DepartmentCreateCtrl', function($scope, $http, $state, departmentApi)
        {
           
            $scope.initializeDepartmentCreateScreen = function () {
                $scope.department = {};
                $scope.department.successful = false;
                $scope.department.error = false;
            };

            $scope.initializeDepartmentCreateScreen();

            $scope.gotoDepartmentListScreen = function () {
                $state.go('app.departmentList',{});
            };  

            $scope.saveDepartment = function () {
                var department = {};
                department.addressId = "1";
                department.name = $scope.department.name;
                department.description = $scope.department.description;
                departmentApi.post(department).then(function (data) {
                    $scope.department.successful = true;
                    $scope.gotoDepartmentListScreen();
                }, function (error) {                    
                    $scope.department.error = true;
                });

            }; 

        });
}());