(function () {
    angular.module('AppAuthentication',['ngStorage'])
        .controller('AuthenticationCtrl', function($scope, $http, $localStorage, $location, $state, $rootScope, jwtHelper)
        {
            $scope.user = {
                email: "admin@admin.org",
                password: "Psalm119"
            };
            $scope.login = function()
            {

                return $http(
                    {
                        method: 'POST',
                        url: 'http://fixedasset.backend/authenticate',
                        data: $scope.user
                    }).then(function(response)
                    {
                        $rootScope.isAuthenticated = true;
                        $localStorage.token = response.data.token;

                        var token = $localStorage.token;  
                        if (token)
                        {
                          var claims = jwtHelper.decodeToken(token);
                        }  
                
                        if (claims)
                        {
                          $rootScope.authenticatedUserFullName = claims.firstName + ' ' + claims.lastName; 
                          $rootScope.authenticatedUserName = claims.userName;
                        }  

                        $state.go('app.main');
                        
                    }, function(error)
                    {
                        $rootScope.isAuthenticated = false;
                        console.log("error : " + error.data.error);
                    });
            };
        });
}());