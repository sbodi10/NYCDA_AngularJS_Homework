//Swami Shreeji
var myApp = angular.module('myApp', []);

myApp.controller('myController', ['$scope', '$timeout', '$interval', 'BoardDTO', 'SimonDTO', function($scope, $timeout, $interval, BoardDTO, SimonDTO) {

	$scope.board = new BoardDTO();
	$scope.startGame = function() {
		console.log("Starting Game!");
		var game = new SimonDTO();
	};
	$scope.addNewColor = function(color) {
		$scope.board.addColor(color);
	};


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


myApp.factory('SimonDTO', ['$timeout', '$interval', function($timeout, $interval) {

	function SimonDTO() {
		this.myPattern = [];
		this.newPattern = [];
		this.turn = 1;
		this.seconds = 3000;
	};

	SimonDTO.selectColor = function() {


	};

	SimonDTO.prototype.myTurn = function() {

		this.seconds+= 3000;

		//This is used for the total time it takes Simon to
		//complete his turn
		$timeout(function(seconds) {


			//Use Interval to space out when the user selects a box
			$interval(function() {
				console.log("Color Selected");
			}, 1500);


		}, this.seconds);

	};


	return SimonDTO;
}]);