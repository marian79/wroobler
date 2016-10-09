'use strict';

angular.module('wroobler.helpers', [])

    .service('helperService', function($http) {
        return {
            setEfficiency: function(beer) {
                var grains_weight = 0;
                for(var g = 0; g<beer.recipe.grains.length; g++) {
                    grains_weight += beer.recipe.grains[g].weight;
                }
                var cw = 260 / (260 - beer.blg);
                var performance = parseInt(cw * beer.litres * beer.blg / grains_weight);
                return performance;
            }
        }
    });
