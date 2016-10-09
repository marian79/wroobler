'use strict';

angular.module('wroobler.label', ['ngRoute', 'wroobler.json'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/label/:id', {
    templateUrl: 'views/label/label.html',
    controller: 'labelController'
  });
}])

.controller('labelController', function($scope, $routeParams, jsonService) {
	$(window).scrollTop(0);
    
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