angular.module('wroobler.header', [])
	.directive('headerDctv', function() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'components/directives/header/header.html',
			controller: function() {}
		};
	});
