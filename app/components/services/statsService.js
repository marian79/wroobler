'use strict';

angular.module('wroobler.statsService', [])

    .service('statsService', function($http) {
        return {
            createStatistics: function(beers) {
				var grain_bars = {},
					hop_bars = {},
					performance = [],
					statistics = {
						'best_alk': {'alk': 0},
						'avg_alk': 0,
						'best_blg': {'blg': 0},
						'avg_blg': 0,
						'best_hop': {'weight': 0},
						'used_grains': 0,
						'used_hops': 0,
						'litres': 0,
						'best_performance': {},
						'avg_performance': 0,
						'months': {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0},
						'categries': {}
					},
                    sum_alk = 0,
                    sum_blg = 0,
                    all_alk = 0,
                    all_blg = 0;
				$(beers).each(function() {
					var date = new Date(this.brew_date);
					statistics.months[date.getMonth()+1] += 1;

					if(this.hasOwnProperty("category")) {
						if(statistics.categries[this.category] === undefined) {
							statistics.categries[this.category] = 1;
						} else {
							statistics.categries[this.category] += 1;
						}
					}

					if(this.hasOwnProperty("litres"))
						statistics.litres += this.litres;
					if(this.hasOwnProperty("blg")) {
                        sum_blg += parseFloat(this.blg);
                        all_blg += 1;
                        if(parseFloat(this.blg) > parseFloat(statistics.best_blg.blg)) {
							statistics.best_blg = {'blg': this.blg, 'name': this.name};
						}
                    }
					if(this.hasOwnProperty("alk")) {
						var alk = this.alk.replace('%', '').replace(',', '.');
                        if(!isNaN(alk)) {
                            sum_alk += parseFloat(alk);
                            all_alk += 1;
                        }
                        if(parseFloat(alk) > parseFloat(statistics.best_alk.alk)) {
							statistics.best_alk = {'alk': alk, 'name': this.name};
						}
					}
					if(this.hasOwnProperty("recipe")) {
						var grains = this.recipe.grains;
						var hops = this.recipe.hops;
						var beer_performance = {
							'name': this.name,
							'blg': this.blg,
							'grains_weight': 0,
							'litres': this.litres
						};
						for(var g = 0; g<grains.length; g++) {
							if(!grain_bars.hasOwnProperty(grains[g].name)) {
								grain_bars[grains[g].name] = 0;
							}
							grain_bars[grains[g].name] += grains[g].weight;
							beer_performance.grains_weight += grains[g].weight;
							statistics.used_grains += grains[g].weight;
						}
						for(var h = 0; h<hops.length; h++) {
							if(!hop_bars.hasOwnProperty(hops[h].name)) {
								hop_bars[hops[h].name] = 0;
							}
							hop_bars[hops[h].name] += hops[h].weight;
							statistics.used_hops += hops[h].weight;
						}
						performance.push(beer_performance);
					}
				});
				statistics.used_grains = (statistics.used_grains).toFixed(2);
				statistics.used_hops = (statistics.used_hops / 1000).toFixed(2);

				var grains_sorted = Object.keys(grain_bars).map(function (key) { return grain_bars[key]; });
				var hops_sorted = Object.keys(hop_bars).map(function (key) { return hop_bars[key]; });
				grains_sorted.sort(function(a,b){return b-a});
				hops_sorted.sort(function(a,b){return b-a});

				var max_grains = Math.max.apply(null, grains_sorted);
				var max_hops = Math.max.apply(null, hops_sorted);

				statistics.top_grains = this.getTopGrains(grain_bars, grains_sorted);
				statistics.top_hops = this.getTopHops(hop_bars, hops_sorted);
				statistics.best_hop = this.getBestHop(hop_bars);
				statistics.best_performance = this.getBestPerformance(performance);

                statistics.avg_alk = parseFloat(sum_alk / all_alk).toFixed(2);
                statistics.avg_blg = parseFloat(sum_blg / all_blg).toFixed(2);
				return statistics;
			},

			getBestPerformance: function(data) {
				var max_performance = {'name': '', 'value': 0};
				for(var i=0; i<data.length; i++) {
					var cw = 260 / (260 - data[i].blg);
					var performance = parseInt(cw * data[i].litres * data[i].blg / data[i].grains_weight);
					if(performance > max_performance.value) {
						max_performance.value = performance;
						max_performance.name = data[i].name;
					}
				}
				return max_performance;
			},

			getTopGrains: function(grain_bars, grains_sorted) {
				var used_grains = [],
					top_grains = [];
				for(var i=0; i<7; i++) {
					for(var k in grain_bars) {
						if(grain_bars[k] == grains_sorted[i] && used_grains.indexOf(k) === -1) {
							top_grains.push({'name': k, 'value': grain_bars[k]});
							used_grains.push(k);
						}
					}
				}
				return top_grains;
			},

			getTopHops: function(hop_bars, hops_sorted) {
				var used_hops = [],
					top_hops = [];
				for(var i=0; i<7; i++) {
					for(var k in hop_bars) {
						if(hop_bars[k] == hops_sorted[i] && used_hops.indexOf(k) === -1) {
							top_hops.push({'name': k, 'value': hop_bars[k]});
							used_hops.push(k);
						}
					}
				}
				return top_hops;
			},

			getBestHop: function(hop_bars) {
				var best_hop = {'weight': 0};
				var hop_keys = Object.keys(hop_bars);
				for(var i = 0; i<hop_keys.length; i++) {
					if(hop_bars[hop_keys[i]] > best_hop.weight)
						best_hop = {'name': hop_keys[i], 'weight': hop_bars[hop_keys[i]]};
				}
				return best_hop;
			}
        }
    });
