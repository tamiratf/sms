(function () {
    angular.module('App.FixedAsset.Site.Create', [
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'api.sites'
        ])
        .controller('SiteCreateCtrl', function($scope, $http, $state, siteApi)
        {
           
            $scope.initializeSiteCreateScreen = function () {
                $scope.site = {};
                $scope.site.successful = false;
                $scope.site.error = false;
            };

            $scope.initializeSiteCreateScreen();

            $scope.gotoSiteListScreen = function () {
                $state.go('app.siteList',{});
            };  

            $scope.saveSite = function () {
                var site = {};
                site.addressId = "1";
                site.companyId = "1";
                site.name = $scope.site.name;
                site.description = $scope.site.description;
                siteApi.post(site).then(function (data) {
                    $scope.site.successful = true;
                    $scope.gotoSiteListScreen();
                }, function (error) {                    
                    $scope.site.error = true;
                });

            }; 

        });
}());