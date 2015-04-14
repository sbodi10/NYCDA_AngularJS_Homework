//Swami Shreeji
var myApp = angular.module('myApp', []);

myApp.controller('myController', ['$scope', '$timeout', '$interval', 'Color_Value', 'BoardDTO', 'SimonDTO', function($scope, $timeout, $interval, Color_Value, BoardDTO, SimonDTO) {

	$scope.colorOptions = Color_Value;

	$scope.userSelect = function(color) {
		$scope.currentSelection = color;
		$timeout(function() {
			$scope.currentSelection = null;
		}, 3000);
	}

	//Intialize Views
	$scope.sequence = 'Current Simon Sequence';
	$scope.board = new BoardDTO();

	$scope.startGame = function() {
		console.log("Starting Game!");
		console.log("3");
		console.log("3");
		console.log("1");
		$scope.begin = "Let's Begin!";
		$timeout(function() {
			$scope.begin = '';
			console.log("Simon's Turn Now");
		}, 3000);

		var game = new SimonDTO();
		$scope.gameStatus = $scope.board.gameStatus;

		//$scope.begin = game.getStatus();
		while(true) {
			//Simon's Turn
			$scope.board.addSimonColor();
			//Add User's Turn
			$scope.board.addUserColor();
		}

	};
	$scope.addNewColor = function(color) {
		$scope.board.addUserColor(color);
	};


}]);

myApp.value('Color_Value', {
	Red : {

	},
	Blue : {

	},
	Green : {

	},
	Yellow : {

	}
});


myApp.factory('BoardDTO', ['$timeout', '$interval', function($timeout, $interval) {

	function BoardDTO() {
		this.userColors = [];
		this.simonColors = [];
		this.score = 0;
		this.level = 0;
		this.gameStatus = '';
	};

	BoardDTO.prototype.addSimonColor = function() {
		var self = this;
		self.score++;
		self.level++;

		$timeout(function() {

			$interval(function() {
				var newColor = Math.floor((Math.random() * 4) + 1);
				console.log(newColor);

				//Simon needs to click on newBoxColor to add to array

				self.simonColors.push({
					value: newColor
				});

			}, 2000, self.level); //Time inbetween each color Simon selects && number of times repeated

		}, 3000); //Time before Simon begin's his turn

	};

	BoardDTO.prototype.addUserColor = function(boxcolor) {
		var self = this;
		var i = 0;

		self.userColors.push({
			value: boxcolor
		});

		if(self.userColors[i] !== self.simonColors[i]) {
			console.log("Game Over!");
			self.gameStatus = "Incorrect! Game Over!";
		}
		else {
			i++;
		}

		console.log(self.userColors);
	};

	BoardDTO.prototype.getColors = function() {
		return userColors;
	};

	return BoardDTO;
}]);


myApp.factory('SimonDTO', ['$timeout', '$interval', function($timeout, $interval) {

	function SimonDTO() {
		this.myPattern = [];
		this.newPattern = [];
		this.turn = 1;
		this.seconds = 3000;
//		this.begin = "Let's Begin!";
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

	SimonDTO.prototype.getStatus = function() {
		/*this.begin = "Let's Begin!";
		$timeout(function() {
			this.begin = '';
		}, 3000);*/
		this.turn = "Simon's Turn!";

		this.turn = "You're Turn!";

		this.turn = "Game Over!";

	};


	return SimonDTO;
}]);