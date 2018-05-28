(function()
{
    angular.module('api.sites', [
            'api.base'
        ])
        .factory('siteApi', [
            'baseApi'
            ,function(baseApi) {
                return baseApi.withConfig(function(Configurer) {
                    Configurer.setRestangularFields({"id": "id"})
                }).all('sites');
            }
        ]);
})();
