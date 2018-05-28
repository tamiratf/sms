(function () {
    angular.module('App.FixedAsset.Company.Create', [
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'api.companies'
        ])
        .controller('CompanyCreateCtrl', function($scope, $http, $state, companyApi)
        {
           
            $scope.initializeCompanyCreateScreen = function () {
                $scope.company = {};
                $scope.company.successful = false;
                $scope.company.error = false;
            };

            $scope.initializeCompanyCreateScreen();

            $scope.gotoCompanyListScreen = function () {
                $state.go('app.companyList',{});
            };  

            $scope.saveCompany = function () {
                var company = {};
                company.addressId = "1";
                company.name = $scope.company.name;
                company.description = $scope.company.description;
                companyApi.post(company).then(function (data) {
                    $scope.company.successful = true;
                    $scope.gotoCompanyListScreen();
                }, function (error) {                    
                    $scope.company.error = true;
                });

            }; 

        });
}());