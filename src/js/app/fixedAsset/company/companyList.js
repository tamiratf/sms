(function () {
    angular.module('App.FixedAsset.Company.List', [
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'api.companies'
        ])
        .controller('CompanyListCtrl', function($scope, $http, $state, companyApi)
        {
            $scope.myAppScopeProvider = {
                openDetail: function(company) {    
                    $state.go('app.companyDetail', {
                        id: company.entity.id
                    });
                }
            };
            
            $scope.companies = {
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
    
            $scope.companies.columnDefs = [
                {
                    name: "Id",
                    field: 'id',
                    width: 150
                }, {
                    displayName: "Company Name",
                    field: "name",
                    type: "string"
                }, {
                    displayName: "Description",
                    field: "description",
                    type: "string"
                }, {
                    displayName: "Address",
                    field: "addressId",
                    type: "string"
                }
            ];

            

            $scope.companies.data = [];

            $scope.refreshCompany = function () {
                companyApi.getList().then(function (data) {
                    $scope.companies.data = data;
                }, function (error) {
                        console.log(error);
                    });
            };    

            $scope.initializeCompanyScreen = function () {

                $scope.refreshCompany();
                
            };

            $scope.initializeCompanyScreen();

            $scope.searchCompany = function () {
                var txtSearchFields = {
                    'likename': $scope.company.name
                };

                if (!$scope.company.name) {
                    delete txtSearchFields.likename;
                }

                companyApi.getList(txtSearchFields).then(function (data) {
                    $scope.companies.data = data;
                }, function (error) {
                        console.log(error);
                    });
                
            };  
            
            $scope.resetSearch = function () {
                $scope.company = {};
                $scope.refreshCompany();
            }; 

            $scope.gotoCreateCompany = function () {
                $state.go('app.companyCreate',{});
            };  

        });
}());