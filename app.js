'use strict';

angular.module('wroobler', [
	'ngRoute',
	'ngSanitize',
	'googlechart',

	// directives
	'wroobler.header',
	'wroobler.latestBeer',
	'wroobler.beerBox',
	'wroobler.beerBoxSimple',
	'wroobler.beerRecipe',

	// services
	'wroobler.helpers',
	'wroobler.json',
	'wroobler.statsService',

	// views
	'wroobler.beersList',
	'wroobler.beerCategory',
	'wroobler.beer',
	'wroobler.label',
	'wroobler.stats'
]).

config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/beersList'});
}]);
