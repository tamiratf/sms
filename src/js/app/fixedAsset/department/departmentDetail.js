(function () {
    angular.module('App.FixedAsset.Department.Detail', [
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'api.departments',
        'api.companies'
        ])
        .controller('DepartmentDetailCtrl', function($scope, $http, $state,$stateParams, departmentApi, companyApi)
        {
           
            $scope.initializeDepartmentDetailScreen = function () {
                $scope.department = {};
                $scope.companies = [];

                $scope.refreshScreen();  
                
                companyApi.getList().then(function (data) {
                    $scope.companies = data;
                });
            };

            $scope.refreshScreen = function () {
                departmentApi.getList({ "whereid": $stateParams.id } ).then(function (data) {
                    $scope.department = data[0];
                }, function (error) {
                    $scope.department = {}
                    });
            }; 

            $scope.initializeDepartmentDetailScreen();

            $scope.gotoDepartmentListScreen = function () {
                $state.go('app.departmentList',{});
            };  

            $scope.updateDepartment = function () {
                $scope.department.put().then(function (data) {
                    $scope.department.successful = true;
                }, function (error) {                    
                    $scope.department.error = true;
                });
            }; 

            $scope.deleteDepartment = function () {
                $result = confirm("are you sure you want to delete the department?", true, false);
                if ($result) {
                    $scope.department.remove().then(function (data) {
                        $scope.gotoDepartmentListScreen();
                    }, function (error) {
                        $scope.department.error = true;
                    });
                }    
            };    

        });
}());