(function()
{
    angular.module('api.areas', [
            'api.base'
        ])
        .factory('areaApi', [
            'baseApi'
            ,function(baseApi) {
                return baseApi.withConfig(function(Configurer) {
                    Configurer.setRestangularFields({"id": "id"})
                }).all('areas');
            }
        ]);
})();
