(function () {

    var moduleDependencies = [
        'api.areas',
        'hierarchical-selector'
    ];

    var controllerDependencies = [        
        'areaApi',
        '$rootScope',
        '$scope'
    ];

    angular.module('App.FixedAsset.Component.Address', moduleDependencies)
        .controller('AddressComponentController', AddressComponentController)
        .component('addressComponent',{
            bindings: {
            }
            ,templateUrl: 'js/app/fixedAsset/common/address/address.tpl.html'
            ,controller: AddressComponentController
        });

        AddressComponentController.$inject = controllerDependencies;

    function AddressComponentController(
        areaApi,
        $rootScope,
        $scope
    ) {
        var $ctrl = this;
        
        $ctrl.bag = [{
            id: 1,
            name: 'Glasses',
            children: [{
                id: 2,
                name: 'Top Hat',
                children: []
            },{
                    id: 3,
                    name: 'Curly Mustache',
                    children: []
            }]
        }];

        $ctrl.areas = [];

        $ctrl.refit_keys = function(o) {
            var selectionArray = {};

            selectionArray["id"] = o.id;
            selectionArray["name"] = o.AreaName;
            
            
            if (o.children.length) {
                selectionArray["children"] = [];
                _.forEach(o.children, function (value) {
                    selectionArray["children"].push($ctrl.refit_keys(value));
                });
            }

            return selectionArray;
        };

        $ctrl.transformAreas = function (data) {
            return $ctrl.refit_keys(data);
        };
        
        $ctrl.$onInit = function () {
            areaApi.getList().then(function (data) {                
                $ctrl.areas.push($ctrl.transformAreas(data[0]));
            }, function (error) {
                    console.log(error);
                });
        }; 
    }
})();
