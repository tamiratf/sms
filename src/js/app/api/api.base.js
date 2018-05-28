(function()
{
    angular.module('api.base', [
            'restangular',
            'ngStorage'
        ])
        .factory('baseApi', [
            'Restangular',
            '$localStorage'
            ,function(Restangular, $localStorage) {
                return Restangular.withConfig(
                    function(Configurer) {
                        Configurer.setBaseUrl('http://sms.backend/api/v1');
                        Configurer.addResponseInterceptor(
                            function(data, operation, what, url, response, deferred) {
                                
                                if (operation === "getList") {
                                    if (data.data)
                                    {
                                        data = data.data; 
                                    }  
                                }

                                var r = {
                                    'status': response.status,
                                    'data': data,
                                    'operation': operation,
                                    'url': url,
                                    'params': response.config.params ? response.config.params : {}
                                };

                                if (data && data.success) {
                                    var ret = data['data'];
                                    if(data.count != undefined) ret.count = data.count;
                                    return ret;
                                }

                                return data;
                            }
                        );

                        Configurer.setDefaultHeaders(
                            {
                                'Authorization': 'Bearer ' + $localStorage.token
                            }
                        );
                    }

                );

            }
        ]);
})();
