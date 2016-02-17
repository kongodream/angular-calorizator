var calorizatorApp = angular.module('calorizatorApp', [
    'ngRoute',
    'calorizatorControllers',
    'calorizatorServices'
]);

calorizatorApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/categories', {
                templateUrl: 'partials/categories-list.html',
                controller: 'CategoriesListCtrl'
            }).
            when('/categories/:categoryId', {
                templateUrl: 'partials/foods-list.html',
                controller: 'FoodsListCtrl'
            }).
            otherwise({
                redirectTo: '/categories'
            });
    }]);