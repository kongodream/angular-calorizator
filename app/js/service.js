var calorizatorServices = angular.module('calorizatorServices', [
    'ngResource'
]);

calorizatorServices.factory('Category', ['$resource',
    function ($resource) {
        return $resource('food/:categoryId.json', {}, {
            query: {method: 'GET', params: {categoryId: 'categories'}, isArray: true}
        });
    }]);

calorizatorServices.factory('Ration', function() {
    var ration = [];

    function containsObject(obj) {
        for (var i = 0; i < ration.length; i++) {
            if (angular.equals(ration[i], obj)) {
                return true;
            }
        }
        return false;
    }

    function addToRation(dish) {
        if(!containsObject(dish)){
            ration.push(dish);
            dish.added = true;
        }
    }

    function amountOfCalories() {
        var caloriesAmount = amountOf('calories');
        return caloriesAmount;
    }

    // Жири
    function amountOfTriglyceride() {
        var  triglycerideAmount =  amountOf('triglyceride');
        return triglycerideAmount;
    }

    function amountOfProtein() {
        var  proteinAmount = amountOf('protein');
        return proteinAmount;
    }

    function amountOfCarbohydrate() {
        var  carbohydrateAmount = amountOf('carbohydrate');
        return carbohydrateAmount;
    }

    function amountOf(field) {
        field = '' + field;
        var result = ration.reduce(function(sum, dish) {
            return sum + dish[field];
        }, 0);
        result = Number(result.toFixed(1));
        return result;
    }

    function removeFromRation(dish) {
        if (containsObject(dish)) {
            var index = ration.indexOf(dish);
            ration.splice(index, 1);
            delete dish.added;
        }
    }

    return {
        ration : ration,
        addToRation: addToRation,
        containsObject: containsObject,
        removeFromRation: removeFromRation,
        amountOfCalories: amountOfCalories,
        amountOf: amountOf
    };
});