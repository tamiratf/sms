(function () {
    angular.module('App.FixedAsset.Department.List', [
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'api.departments'
        ])
        .controller('DepartmentListCtrl', function($scope, $http, $state, departmentApi)
        {
            $scope.myAppScopeProvider = {
                openDetail: function(department) {    
                    $state.go('app.departmentDetail', {
                        id: department.entity.id
                    });
                }
            };
            
            $scope.departments = {
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
    
            $scope.departments.columnDefs = [
                {
                    name: "Id",
                    field: 'id',
                    width: 150
                }, {
                    displayName: "Department Name",
                    field: "name",
                    type: "string"
                }, {
                    displayName: "Description",
                    field: "description",
                    type: "string"
                }, {
                    displayName: "Company",
                    field: "company",
                    type: "string"
                }
            ];

            
            $scope.transformDepartmentData = function (data) {
                _.forEach(data, function (obj) {
                    obj.company = obj.company.name;
                });

                return data;
            }; 

            $scope.departments.data = [];

            $scope.refreshDepartment = function () {
                departmentApi.getList({ "with[]": 'Company' }).then(function (data) {                    
                    $scope.departments.data = $scope.transformDepartmentData(data);
                }, function (error) {
                        console.log(error);
                    });
            };    

            $scope.initializeDepartmentScreen = function () {

                $scope.refreshDepartment();
                
            };

            $scope.initializeDepartmentScreen();

            $scope.searchDepartment = function () {
                var txtSearchFields = {
                    'likename': $scope.department.name,
                    'likedepartmentType': $scope.department.departmentType
                };

                if (!$scope.department.name) {
                    delete txtSearchFields.likename;
                }
                if (!$scope.department.departmentType) {
                    delete txtSearchFields.likedepartmentType;
                }

                departmentApi.getList(txtSearchFields).then(function (data) {
                    $scope.departments.data = data;
                }, function (error) {
                        console.log(error);
                    });
                
            };  
            
            $scope.resetSearch = function () {
                $scope.department = {};
                $scope.refreshDepartment();
            }; 

            $scope.gotoCreateDepartment = function () {
                $state.go('app.departmentCreate',{});
            };  

        });
}());