'use strict';

angular.module('wroobler.stats', ['wroobler.json', 'wroobler.statsService', 'googlechart'])

.controller('statsController', function($scope, jsonService, statsService, $timeout) {
	$scope.loaded = false;
	$scope.statistics = {};

    jsonService.getBeers().then(function(data) {
		$scope.statistics = statsService.createStatistics(data);

		// top 5 grains
		$scope.grainChart = {};
		$scope.grainChart.type = "BarChart";
    	$scope.grainChart.data = {"cols": [
	        {id: "t", label: "Słód", type: "string"},
	        {id: "s", label: "kg", type: "number"}
	    ], "rows": [
	        {c: [{v: $scope.statistics.top_grains[0].name}, {v: $scope.statistics.top_grains[0].value}]},
	        {c: [{v: $scope.statistics.top_grains[1].name}, {v: $scope.statistics.top_grains[1].value}]},
	        {c: [{v: $scope.statistics.top_grains[2].name}, {v: $scope.statistics.top_grains[2].value}]},
	        {c: [{v: $scope.statistics.top_grains[3].name}, {v: $scope.statistics.top_grains[3].value}]},
	        {c: [{v: $scope.statistics.top_grains[4].name}, {v: $scope.statistics.top_grains[4].value}]},
	        {c: [{v: $scope.statistics.top_grains[5].name}, {v: $scope.statistics.top_grains[5].value}]},
	        {c: [{v: $scope.statistics.top_grains[6].name}, {v: $scope.statistics.top_grains[6].value}]}
	    ]};
	    $scope.grainChart.options = {
	    	colors: ['#bbbbbb'],
	    	hAxis: {textStyle: {'color': '#fff'}, baselineColor: '#eeeeee'},
	    	vAxis: {textStyle: {'color': '#fff'}, baselineColor: '#eeeeee'},
	    	legend: {position: 'top', textStyle: {color: '#ffffff', fontSize: 16}}
	    }

		// top 5 hops
		$scope.hopChart = {};
		$scope.hopChart.type = "BarChart";
    	$scope.hopChart.data = {"cols": [
	        {id: "t", label: "Chmiel", type: "string"},
	        {id: "s", label: "g", type: "number"}
	    ], "rows": [
	        {c: [{v: $scope.statistics.top_hops[0].name}, {v: $scope.statistics.top_hops[0].value}]},
	        {c: [{v: $scope.statistics.top_hops[1].name}, {v: $scope.statistics.top_hops[1].value}]},
	        {c: [{v: $scope.statistics.top_hops[2].name}, {v: $scope.statistics.top_hops[2].value}]},
	        {c: [{v: $scope.statistics.top_hops[3].name}, {v: $scope.statistics.top_hops[3].value}]},
	        {c: [{v: $scope.statistics.top_hops[4].name}, {v: $scope.statistics.top_hops[4].value}]},
	        {c: [{v: $scope.statistics.top_hops[5].name}, {v: $scope.statistics.top_hops[5].value}]},
	        {c: [{v: $scope.statistics.top_hops[6].name}, {v: $scope.statistics.top_hops[6].value}]}
	    ]};
	    $scope.hopChart.options = {
	    	colors: ['#bbbbbb'],
	    	hAxis: {textStyle: {'color': '#fff'}, baselineColor: '#eeeeee'},
	    	vAxis: {textStyle: {'color': '#fff'}, baselineColor: '#eeeeee'},
	    	legend: {position: 'top', textStyle: {color: '#ffffff', fontSize: 16}}
	    }

		// monthChart
		$scope.monthChart = {};
	    $scope.monthChart.type = "ColumnChart";
	    $scope.monthChart.data = {"cols": [
	        {id: "m", label: "Mieciąc", type: "string"},
	        {id: "s", label: "Ilość", type: "number"}
	    ], "rows": [
	        {c: [{v: "Styczeń"}, {v: $scope.statistics.months[1]}]},
	        {c: [{v: "Luty"}, {v: $scope.statistics.months[2]}]},
	        {c: [{v: "Marzec"}, {v: $scope.statistics.months[3]}]},
	        {c: [{v: "Kwiecień"}, {v: $scope.statistics.months[4]}]},
	        {c: [{v: "Maj"}, {v: $scope.statistics.months[5]}]},
	        {c: [{v: "Czerwiec"}, {v: $scope.statistics.months[6]}]},
	        {c: [{v: "Lipiec"}, {v: $scope.statistics.months[7]}]},
	        {c: [{v: "Sierpień"}, {v: $scope.statistics.months[8]}]},
	        {c: [{v: "Wrzesień"}, {v: $scope.statistics.months[9]}]},
	        {c: [{v: "Październik"}, {v: $scope.statistics.months[10]}]},
	        {c: [{v: "Listopad"}, {v: $scope.statistics.months[11]}]},
	        {c: [{v: "Grudzień"}, {v: $scope.statistics.months[12]}]}
	    ]};
	    $scope.monthChart.options = {
	    	colors: ['#bbbbbb'],
	    	hAxis: {textStyle: {'color': '#fff'}, baselineColor: '#eeeeee'},
	    	vAxis: {textStyle: {'color': '#fff'}, baselineColor: '#eeeeee'},
	    	legend: {position: 'top', textStyle: {color: '#ffffff', fontSize: 16}}
	    }

    });

});
