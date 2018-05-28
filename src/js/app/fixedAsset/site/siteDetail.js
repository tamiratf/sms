(function () {
    angular.module('App.FixedAsset.Site.Detail', [
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'api.sites',
        'api.companies'
        ])
        .controller('SiteDetailCtrl', function($scope, $http, $state,$stateParams, siteApi, companyApi)
        {
           
            $scope.initializeSiteDetailScreen = function () {
                $scope.site = {};
                $scope.roles = [];

                $scope.refreshScreen();     
                companyApi.getList().then(function (data) {
                    $scope.companies = data;
                });
            };

            $scope.refreshScreen = function () {
                siteApi.getList({ "whereid": $stateParams.id } ).then(function (data) {
                    $scope.site = data[0];
                }, function (error) {
                    $scope.site = {}
                    });
            }; 

            $scope.initializeSiteDetailScreen();

            $scope.gotoSiteListScreen = function () {
                $state.go('app.siteList',{});
            };  

            $scope.updateSite = function () {
                $scope.site.put().then(function (data) {
                    $scope.site.successful = true;
                }, function (error) {                    
                    $scope.site.error = true;
                });
            }; 

            $scope.deleteSite = function () {
                $result = confirm("are you sure you want to delete the site?", true, false);
                if ($result) {
                    $scope.site.remove().then(function (data) {
                        $scope.gotoSiteListScreen();
                    }, function (error) {
                        $scope.site.error = true;
                    });
                }    
            };    

        });
}());