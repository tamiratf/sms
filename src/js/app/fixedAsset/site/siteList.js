(function () {
    angular.module('App.FixedAsset.Site.List', [
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'api.sites'
        ])
        .controller('SiteListCtrl', function($scope, $http, $state, siteApi)
        {
            $scope.myAppScopeProvider = {
                openDetail: function(site) {    
                    $state.go('app.siteDetail', {
                        id: site.entity.id
                    });
                }
            };

            var withRelation = [
                'Address.Location',
                'Company'
            ];
            
            $scope.sites = {
                paginationPageSizes: [10, 25, 50, 75],
                paginationPageSize: 10,
                useExternalPagination: true,
                enableSorting: true,
                useExternalSorting: true,
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: false,
                noUnselect: true,
                appScopeProvider: $scope.myAppScopeProvider,
                rowTemplate: '<div ng-dblclick="grid.appScope.openDetail(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" ui-grid-cell></div>',
                onRegisterApi: function(gridApi) {
                    $scope.gridApi = gridApi;
    
                    $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {    
                    });
    
                    gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {                        
                    });
    
                }
            };
    
            $scope.sites.columnDefs = [
                {
                    name: "Id",
                    field: 'id',
                    width: 150
                }, {
                    displayName: "Site Name",
                    field: "name",
                    type: "string"
                }, {
                    displayName: "Description",
                    field: "description",
                    type: "string"
                },
                {
                    displayName: "Address",
                    field: "Address",
                    type: "string"
                },
                {
                    displayName: "Company",
                    field: "Company",
                    type: "string"
                }
            ];

            

            $scope.transformSites = function (data) {
                _.forEach(data, function (obj) {
                    obj.Address = (obj.address.location) ? obj.address.location.AreaName + ' - ' + obj.address.address : "";
                    obj.Company = (obj.company) ? obj.company.name + ' - ' + obj.company.description : "";
                });

                return data;
            }; 
            $scope.sites.data = [];

            $scope.refreshSite = function (query) {
                siteApi.getList(query).then(function (data) {
                    $scope.sites.data = $scope.transformSites(data);
                }, function (error) {
                        console.log(error);
                    });
            };    

            $scope.initializeSiteScreen = function () {
                $scope.refreshSite({'with[]' : withRelation});                
            };

            $scope.initializeSiteScreen();

            $scope.searchSite = function () {
                $scope.site = ($scope.site) ? $scope.site : {};
                var txtSearchFields = {
                    'likename': $scope.site.name,
                    "with[]": withRelation
                };

                if (!$scope.site.name) {
                    delete txtSearchFields.likename;
                }

                $scope.refreshSite(txtSearchFields);                
            };  
            
            $scope.resetSearch = function () {
                $scope.site = {};
                $scope.refreshSite();
            }; 

            $scope.gotoCreateSite = function () {
                $state.go('app.siteCreate',{});
            };  

        });
}());