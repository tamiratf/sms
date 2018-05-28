(function()
{
    angular.module('api.companies', [
            'api.base'
        ])
        .factory('companyApi', [
            'baseApi'
            ,function(baseApi) {
                return baseApi.withConfig(function(Configurer) {
                    Configurer.setRestangularFields({"id": "id"})
                }).all('companies');
            }
        ]);
})();
