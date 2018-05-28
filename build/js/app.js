angular.module("app",["ui.router","oc.lazyLoad","ncy-angular-breadcrumb","angular-loading-bar","angular-jwt","ngStorage","AppAuthentication"]).run(["$rootScope","$state","$stateParams","$localStorage","jwtHelper",function(a,e,t,o,n){return a.$on("$locationChangeStart",function(){document.body.scrollTop=document.documentElement.scrollTop=0}),a.$on("$locationChangeSuccess",function(a,e,t,r,l){var i=o.token,c=angular.copy(window.location.hash);i&&!n.isTokenExpired(i)||(window.location.href=window.location.origin+"/#/login","#/login"!==c&&window.location.reload())}),a.$state=e,a.$stateParams=t}]).config(["$locationProvider","cfpLoadingBarProvider","$stateProvider","$urlRouterProvider","$ocLazyLoadProvider","$breadcrumbProvider",function(a,e,t,o,n,r){a.hashPrefix(""),o.otherwise("/login"),n.config({debug:!0}),r.setOptions({prefixStateName:"app.main",includeAbstract:!0,template:'<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'}),e.includeSpinner=!1,e.latencyThreshold=1,t.state("app",{abstract:!0,templateUrl:"views/common/layouts/full.html",ncyBreadcrumb:{label:"Root",skip:!0}}).state("app.main",{url:"/dashboard",templateUrl:"views/main.html",ncyBreadcrumb:{label:"Home"},params:{subtitle:"Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit"}}).state("app.login",{url:"/login",templateUrl:"views/pages/login.html",ncyBreadcrumb:{label:"Login"}})}]).controller("AppController",function(a,e,t){a.logout=function(){e.token=null,t.go("app.login")}});