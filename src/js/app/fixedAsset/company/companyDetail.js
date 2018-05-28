(function () {
    angular.module('App.FixedAsset.Company.Detail', [
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'api.companies'
        ])
        .controller('CompanyDetailCtrl', function($scope, $http, $state,$stateParams, companyApi)
        {
           
            $scope.initializeCompanyDetailScreen = function () {
                $scope.company = {};
                $scope.roles = [];

                $scope.refreshScreen();                
            };

            $scope.refreshScreen = function () {
                companyApi.getList({ "whereid": $stateParams.id } ).then(function (data) {
                    $scope.company = data[0];
                }, function (error) {
                    $scope.company = {}
                    });
            }; 

            $scope.initializeCompanyDetailScreen();

            $scope.gotoCompanyListScreen = function () {
                $state.go('app.companyList',{});
            };  

            $scope.updateCompany = function () {
                $scope.company.put().then(function (data) {
                    $scope.company.successful = true;
                }, function (error) {                    
                    $scope.company.error = true;
                });
            }; 

            $scope.deleteCompany = function () {
                $result = confirm("are you sure you want to delete the company?", true, false);
                if ($result) {
                    $scope.company.remove().then(function (data) {
                        $scope.gotoCompanyListScreen();
                    }, function (error) {
                        $scope.company.error = true;
                    });
                }    
            };    

        });
}());