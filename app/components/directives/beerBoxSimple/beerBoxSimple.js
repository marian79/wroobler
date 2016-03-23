angular.module('wroobler.beerBoxSimple', [])
	.directive('beerBoxSimpleDctv', function() {
		return {
			restrict: 'E',
			scope: {
				beer: '='
			},
			templateUrl: 'components/directives/beerBoxSimple/beerBoxSimple.html',
			controller: function($scope) {}
		};
	});
