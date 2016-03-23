angular.module('wroobler.beerBox', [])
	.directive('beerBoxDctv', function() {
		return {
			restrict: 'E',
			scope: {
				beer: '='
			},
			templateUrl: 'components/directives/beerBox/beerBox.html',
			controller: function($scope) {
				//console.log($scope.beer);
			}
		};
	});
