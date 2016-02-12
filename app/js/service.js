var calorizatorServices = angular.module('phonecatServices', [
    'ngResource'
]);

calorizatorServices.factory('Category', ['$resource',
    function($resource){
        return $resource('food/:categoryId.json', {}, {
            query: {method:'GET', params:{categoryId:'categories'}, isArray:true}
        });
    }]);
