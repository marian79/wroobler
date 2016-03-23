'use strict';

angular.module('wroobler.beer', ['ngRoute', 'wroobler.json'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/beer/:id', {
    templateUrl: 'views/beer/beer.html',
    controller: 'beerDetailsController'
  });
}])

.controller('beerDetailsController', function($scope, $routeParams, jsonService) {
	$(window).scrollTop(0);
    $scope.loaded = false;

    jsonService.getBeer($routeParams.id)
        .then(function(data) {
            $scope.beer = data;
            jsonService.getStyle()
                .then(function(styles) {
                    $scope.beer.style = styles.styles[data.style];
                    $scope.loaded = true;
                });
        });	

});