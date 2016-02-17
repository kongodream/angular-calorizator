var calorizatorControllers = angular.module('calorizatorControllers', []);

calorizatorControllers.controller('SensorsCtrl', ['$scope', 'Ration',
    function ($scope, Ration) {
        $scope.ration = Ration.ration;
        $scope.activities = [
            {value: 1.25, description: 'сидячий образ жизни, сидячая работа'},
            {value: 1.35, description: 'легкая активность'},
            {value: 1.55, description: 'средняя активность'},
            {value: 1.75, description: 'высокая активность'},
            {value: 1.95, description: 'экстремально-высокая активность'},
        ];

        $scope.amountOfCalories = Ration.amountOfCalories;

        $scope.user = {
            activity: {
                value: 0
            }
        };

        $scope.recommendedAmountOfCalories = function () {
            var user = $scope.user;
            var caloriesAmount;
            if (user.sex == 'man') {
                caloriesAmount = recommendedForMan(user);
            } else {
                caloriesAmount = recommendedForWoman(user);
            }
            caloriesAmount = Number((caloriesAmount * user.activity.value).toFixed(0));
            return caloriesAmount ? caloriesAmount : 0;
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

calorizatorControllers.controller('CategoriesListCtrl', ['$scope', 'Category',
    function ($scope, Category) {
        $scope.foodTypes = Category.query();
}]);

calorizatorControllers.controller('FoodsListCtrl', ['$scope', '$routeParams', '$http', 'Ration',
    function ($scope, $routeParams, $http, Ration) {
        $http.get('food/' + $routeParams.categoryId + '.json').success(function (response) {
            $scope.categoryTitle = response.category;
            $scope.dishes = response.data;
        });

        $scope.addToRation = Ration.addToRation;
        $scope.removeFromRation = Ration.removeFromRation;
}]);

calorizatorControllers.controller('RationCtrl', ['$scope', 'Ration',
    function ($scope, Ration) {
        $scope.rationDishes = Ration.ration;
        $scope.removeFromRation = Ration.removeFromRation;

        $scope.amountOfProtein = function() {
            return Ration.amountOf('protein');
        };

        $scope.amountOfTriglyceride = function() {
            return Ration.amountOf('triglyceride');
        };

        $scope.amountOfCarbohydrate = function() {
            return Ration.amountOf('carbohydrate');
        };
}]);






