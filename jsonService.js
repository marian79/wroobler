'use strict';

angular.module('wroobler.json', [])

    .service('jsonService', function($http, helperService) {
        return {
            getCategories: function() {
                return $http.get('./components/services/beers.json').then(function(response) {
                    return response.data.categories;
                });
            },
            getLatestBeer: function() {
                return $http.get('./components/services/beers.json').then(function(response) {
                    var beer = response.data.beers.reverse()[0];
                    beer.efficiency = helperService.setEfficiency(beer);
                    return beer;
                });
            },
            getBeers: function(category) {
                return $http.get('./components/services/beers.json').then(function(response) {
                    var results = [];
                    angular.forEach(response.data.beers, function(key, val) {
                        if(key.category === category || category === undefined) {
                            if(key.recipe !== undefined) {
                                key.efficiency = helperService.setEfficiency(key);
                            } else {
                                key.efficiency = 0;
                            }
                            results.push(key);
                        }
                    });
                    return results;
                });
            },
            getBeer: function(id) {
                return $http.get('./components/services/beers.json').then(function(response) {
                    var beer = {};
                    angular.forEach(response.data.beers, function(key, val) {
                        if(key.id == id) {
                            key.efficiency = helperService.setEfficiency(key);
                            beer = key;
                        }
                    });
                    return beer;
                });
            },
            getStyle: function(type) {
                return $http.get('./components/services/beerStyles.json').then(function(response) {
                    return response.data;
                });
            },
            searchBeers: function(query) {
                return $http.get('./components/services/beers.json').then(function(response) {
                    var beers = _.filter(response.data.beers, function(beer) {
                        return beer.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
                    });
                    return beers;
                });
            }
        }
    });
