(function()
{
    angular.module('api.departments', [
            'api.base'
        ])
        .factory('departmentApi', [
            'baseApi'
            ,function(baseApi) {
                return baseApi.withConfig(function(Configurer) {
                    Configurer.setRestangularFields({"id": "id"})
                }).all('departments');
            }
        ]);
})();
