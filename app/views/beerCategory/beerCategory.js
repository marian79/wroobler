'use strict';

angular.module('wroobler.beerCategory', ['ngRoute', 'wroobler.json'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/beerCategory/:category', {
    templateUrl: 'views/beerCategory/beerCategory.html',
    controller: 'beerCategoryController'
  });
}])

.controller('beerCategoryController', function($scope, $routeParams, jsonService) {
	$(window).scrollTop(0);
    $scope.loaded = false;
    $scope.category = $routeParams.category;
    $scope.description = '';
    
    // change to eng just for downloading data
    var category = $routeParams.category === 'Inne' ? 'Others' : $routeParams.category
    jsonService.getBeers(category)
        .then(function(data) {
            $scope.beers = data.reverse();
            $scope.loaded = true;
        });

    jsonService.getStyle(category)
        .then(function(data) {
            $scope.description = data.styles[category];
        });
	

});