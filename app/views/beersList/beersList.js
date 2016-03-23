'use strict';

angular.module('wroobler.beersList', ['ngRoute', 'wroobler.json'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/beersList', {
    templateUrl: 'views/beersList/beersList.html',
    controller: 'beersListController'
  });
}])

.controller('beersListController', function($scope, jsonService) {
    $(window).scrollTop(0);
    $scope.loaded = false;
    
    jsonService.getCategories()
        .then(function(data) {
            $scope.beersCategories = data;
            $scope.loaded = true;
        });

	jsonService.getLatestBeer()
        .then(function(data) {
            $scope.latestBeer = data;
            jsonService.getStyle()
                .then(function(styles) {
                    $scope.latestBeer.style = styles.styles[data.genre];
                });    
        });

});