//Swami Shreeji
var myApp = angular.module('myApp', []);

myApp.controller('myController', ['$scope', '$timeout', '$interval', 'BoardDTO', function($scope, $timeout, $interval, BoardDTO) {

	$scope.board = new BoardDTO();
	$scope.startGame = function() {
		console.log("Starting Game!");
	};
	$scope.addNewColor = function(color) {
		$scope.board.addColor(color);
	};

	//This is used for the total time it takes Simon to
	//complete his turn
	$timeout(function() {
		console.log("Popat");
	}, 2000);


	//Use Interval to space out when the user selects a box
	$interval(function() {
		console.log("Popat Interval");
	}, 4000);


}]);


myApp.factory('BoardDTO', function() {

	function BoardDTO() {
		this.colors = [];
		this.score = '0';
	};

	BoardDTO.prototype.addColor = function(boxcolor) {
		this.colors.push({
			value: boxcolor
		});
		this.score++;
		console.log(this.colors);
	};

	BoardDTO.prototype.getColors = function() {
		return colors;
	};

	return BoardDTO;
});


myApp.service('something', function() {




});