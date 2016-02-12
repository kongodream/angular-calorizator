var calorizatorControllers = angular.module('calorizatorControllers', []);

var ration = [];

calorizatorControllers.controller('SensorsCtrl',  ['$scope',
    function($scope) {
        $scope.activities = [
            {value: 1.25, description: 'сидячий образ жизни, сидячая работа'},
            {value: 1.35, description: 'легкая активность'},
            {value: 1.55, description: 'средняя активность'},
            {value: 1.75, description: 'высокая активность'},
            {value: 1.95, description: 'экстремально-высокая активность'},
        ];

        $scope.amountOfCalories = function() {
            var caloriesAmount = 0;
            for(var i = 0; i < ration.length; i++) {
                caloriesAmount += ration[i].calories;
            }
            return caloriesAmount;
        };

        $scope.user = {
            activity: {
                value:0
            }
        };

        $scope.recommendedAmountOfCalories = function() {
            var user = $scope.user;
            var caloriesAmount;
            if(user.sex == 'man') {
                caloriesAmount = recommendedForMan(user);
            } else {
                caloriesAmount = recommendedForWoman(user);
            }
            caloriesAmount = Number((caloriesAmount * user.activity.value).toFixed(0));
            return  caloriesAmount ? caloriesAmount : 0;
        };

        function recommendedForWoman(params) {
            var calories = 65.51 + 9.6 * params.weight + 1.85 * params.growth - 4.68 * params.age;
            return calories;
        }

        function recommendedForMan(params) {
            var calories = 66.47 + 13.75 * params.weight + 5.0 * params.growth - 6.74 * params.age;
            return calories;
        }

    }]);

calorizatorControllers.controller('CategoriesListCtrl',  ['$scope', 'Category',
    function($scope, Category) {
        $scope.foodTypes = Category.query();
}]);

calorizatorControllers.controller('FoodsListCtrl', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        //$scope.dishes = Category.query({categoryId : $routeParams.categoryId});
        $http.get('food/' + $routeParams.categoryId + '.json').success(function(response) {
            $scope.categoryTitle = response.category;
            $scope.dishes = response.data;
        });

        $scope.addToRation = function(dish) {
            ration.push(dish);
        };


        $scope.containsObject = containsObject;
}]);

calorizatorControllers.controller('RationCtrl', ['$scope',
    function($scope) {
        $scope.rationDishes = ration;

        $scope.removeFromRation = function(dish) {
            if(containsObject(dish)) {
                var index = ration.indexOf(dish);
                ration.splice(index, 1);
            }
        };

    }]);


function containsObject(obj) {
    for (var i = 0; i < ration.length; i++) {
        if (angular.equals(ration[i], obj)) {
            return true;
        }
    }
    return false;
}

function addToRation(dish) {
    ration.push(dish);
}




