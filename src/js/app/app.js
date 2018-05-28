(function () {
  angular
    .module('app', [
      'ui.router',
      'oc.lazyLoad',
      'ncy-angular-breadcrumb',
      'angular-loading-bar',
      'angular-jwt',
      'ngStorage',
      'AppAuthentication',
      'App.AccessControl.User.List',
      'App.AccessControl.User.Create',
      'App.AccessControl.User.Detail',
      'App.AccessControl.Role.List',
      'App.AccessControl.Role.Create',
      'App.AccessControl.Role.Detail',
      'App.AccessControl.Permission.List',
      'App.AccessControl.Permission.Create',
      'App.AccessControl.Permission.Detail',
      'App.FixedAsset.Department.List',
      'App.FixedAsset.Department.Create',
      'App.FixedAsset.Company.List',
      'App.FixedAsset.Company.Create',
      'App.FixedAsset.Company.Detail',
      'App.FixedAsset.Department.Detail',
      'App.FixedAsset.Site.List',
      'App.FixedAsset.Site.Create',
      'App.FixedAsset.Site.Detail',
      'App.FixedAsset.Component.Address'
    ])
    .run(['$rootScope', '$state', '$stateParams', '$localStorage', 'jwtHelper', function ($rootScope, $state, $stateParams, $localStorage, jwtHelper) {
      $rootScope.$on('$locationChangeStart', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      });
  
      $rootScope.$on('$locationChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        var token = $localStorage.token;
        var currentStateHash = angular.copy(window.location.hash);
        if (!token || jwtHelper.isTokenExpired(token)) {
          window.location.href = window.location.origin + "/#/login";
          if (currentStateHash !== '#/login') {
            window.location.reload();
          }
        }
      });
      $rootScope.$state = $state;
      return $rootScope.$stateParams = $stateParams;
    }])
    .config(['$locationProvider', 'cfpLoadingBarProvider', '$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider',
      function ($locationProvider, cfpLoadingBarProvider, $stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {
        $locationProvider.hashPrefix('');
        $urlRouterProvider.otherwise('/login');
    
        $ocLazyLoadProvider.config({
          // Set to true if you want to see what and when is dynamically loaded
          debug: true
        });
    
        $breadcrumbProvider.setOptions({
          prefixStateName: 'app.main',
          includeAbstract: true,
          template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
        });
    
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 1;

        $stateProvider
          .state('app', {
            abstract: true,
            templateUrl: 'views/common/layouts/full.html',
            ncyBreadcrumb: {
              label: 'Root',
              skip: true
            }
          })
          .state('app.main', {
            url: '/dashboard',
            templateUrl: 'views/main.html',
            //page title goes here
            ncyBreadcrumb: {
              label: 'Home',
            },
            //page subtitle goes here
            params: { subtitle: 'Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit' }
          })
          .state('app.login', {
            url: '/login',
            templateUrl: 'js/app/security/login.tpl.html',
            ncyBreadcrumb: {
              label: 'Login',
            }
          })
          .state('app.userList', {
            url: '/user',
            templateUrl: 'js/app/accessControl/user/userList.tpl.html',
            controller: 'UserListCtrl',
            ncyBreadcrumb: {
              label: 'User Management'
            }
          })
          .state('app.userCreate', {
            url: '/user/create',
            templateUrl: 'js/app/accessControl/user/userCreate.tpl.html',
            controller: 'UserCreateCtrl',
            ncyBreadcrumb: {
              label: 'Add New User'
            }
          })
          .state('app.userDetail', {
            url: '/user/{id}',
            templateUrl: 'js/app/accessControl/user/userDetail.tpl.html',
            controller: 'UserDetailCtrl',
            ncyBreadcrumb: {
              label: 'User Detail'
            }
          })
          .state('app.roleList', {
            url: '/role',
            templateUrl: 'js/app/accessControl/role/roleList.tpl.html',
            controller: 'RoleListCtrl',
            ncyBreadcrumb: {
              label: 'Role Management'
            }
          })
          .state('app.roleCreate', {
            url: '/role/create',
            templateUrl: 'js/app/accessControl/role/roleCreate.tpl.html',
            controller: 'RoleCreateCtrl',
            ncyBreadcrumb: {
              label: 'Add New Role'
            }
          })
          .state('app.roleDetail', {
            url: '/role/{id}',
            templateUrl: 'js/app/accessControl/role/roleDetail.tpl.html',
            controller: 'RoleDetailCtrl',
            ncyBreadcrumb: {
              label: 'Role Detail'
            }
          })
          .state('app.permissionList', {
            url: '/permission',
            templateUrl: 'js/app/accessControl/permission/permissionList.tpl.html',
            controller: 'PermissionListCtrl',
            ncyBreadcrumb: {
              label: 'Permission List'
            }
          })
          .state('app.permissionCreate', {
            url: '/permission/create',
            templateUrl: 'js/app/accessControl/permission/permissionCreate.tpl.html',
            controller: 'PermissionCreateCtrl',
            ncyBreadcrumb: {
              label: 'Add New Permission'
            }
          })
          .state('app.permissionDetail', {
            url: '/permission/{id}',
            templateUrl: 'js/app/accessControl/permission/permissionDetail.tpl.html',
            controller: 'PermissionDetailCtrl',
            ncyBreadcrumb: {
              label: 'Permission Detail'
            }
          })
          .state('app.departmentList', {
            url: '/department',
            templateUrl: 'js/app/fixedAsset/department/departmentList.tpl.html',
            controller: 'DepartmentListCtrl',
            ncyBreadcrumb: {
              label: 'Department List'
            }
          })
          .state('app.departmentCreate', {
            url: '/department/create',
            templateUrl: 'js/app/fixedAsset/department/departmentCreate.tpl.html',
            controller: 'DepartmentCreateCtrl',
            ncyBreadcrumb: {
              label: 'Add New Department'
            }
          })
          .state('app.departmentDetail', {
            url: '/department/{id}',
            templateUrl: 'js/app/fixedAsset/department/departmentDetail.tpl.html',
            controller: 'DepartmentDetailCtrl',
            ncyBreadcrumb: {
              label: 'Department Detail'
            }
          })
          .state('app.companyList', {
            url: '/company',
            templateUrl: 'js/app/fixedAsset/company/companyList.tpl.html',
            controller: 'CompanyListCtrl',
            ncyBreadcrumb: {
              label: 'Company List'
            }
          })
          .state('app.companyCreate', {
            url: '/company/create',
            templateUrl: 'js/app/fixedAsset/company/companyCreate.tpl.html',
            controller: 'CompanyCreateCtrl',
            ncyBreadcrumb: {
              label: 'Add New Company'
            }
          })
          .state('app.companyDetail', {
            url: '/company/{id}',
            templateUrl: 'js/app/fixedAsset/company/companyDetail.tpl.html',
            controller: 'CompanyDetailCtrl',
            ncyBreadcrumb: {
              label: 'Company Detail'
            }
          })
          .state('app.siteList', {
            url: '/site',
            templateUrl: 'js/app/fixedAsset/site/siteList.tpl.html',
            controller: 'SiteListCtrl',
            ncyBreadcrumb: {
              label: 'Site List'
            }
          })
          .state('app.siteCreate', {
            url: '/site/create',
            templateUrl: 'js/app/fixedAsset/site/siteCreate.tpl.html',
            controller: 'SiteCreateCtrl',
            ncyBreadcrumb: {
              label: 'Add New Site'
            }
          })
          .state('app.siteDetail', {
            url: '/site/{id}',
            templateUrl: 'js/app/fixedAsset/site/siteDetail.tpl.html',
            controller: 'SiteDetailCtrl',
            ncyBreadcrumb: {
              label: 'Site Detail'
            }
          })
      }]).controller('AppController', function ($scope, $localStorage, $state, jwtHelper, $rootScope) {
        
        var token = $localStorage.token;  
        if (token)
        {
          $rootScope.isAuthenticated = true;
          var claims = jwtHelper.decodeToken(token);
        }  

        if (claims)
        {
          $rootScope.authenticatedUserFullName = claims.firstName + ' ' + claims.lastName; 
          $rootScope.authenticatedUserName = claims.userName;
        }  
        
        $scope.logout = function ()
        {
              $rootScope.isAuthenticated = false;
              $localStorage.token = null;
              $state.go('app.login');
          };
      });
}());
