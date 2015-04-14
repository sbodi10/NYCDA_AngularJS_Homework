//Swami Shreeji
var myApp = angular.module('myApp', []);

myApp.controller('myController', ['$scope', '$timeout', '$interval', 'Color_Value', 'Game_Status', 'BoardDTO', '$log', function($scope, $timeout, $interval, Color_Value, Game_Status, BoardDTO, $log) {

	//Intialize Views
	$scope.board = new BoardDTO();
	$scope.boardDisable = true;
	$scope.colorOptions = Color_Value;
	$scope.gameUpdate = Game_Status.Start.value;
	$scope.sequence = Game_Status.Start.status;
	$scope.level = $scope.board.getLevel();

	$scope.startGame = function() {
		$scope.gameUpdate = Game_Status.Begin.value;
		$scope.sequence = Game_Status.Begin.status;
		$scope.buttonDisable = true;
		console.log("Starting Game!");
		console.log("3");
		console.log("2");
		console.log("1");
		$timeout(function() {
			$scope.gameUpdate = Game_Status.Simon.value;
			$scope.sequence = Game_Status.Simon.status;
			console.log("Simon's Turn Now");
			$scope.board.addSimonColor();
		}, 3000);
	};

	$scope.userSelect = function(model, color) {
		$scope.addNewColor(model);
		$scope.currentSelection = color.value;
		$timeout(function() {
			$scope.currentSelection = '';
		}, 500);
	};

	$scope.addNewColor = function(color) {
		$scope.board.addUserColor(color);
	};

}]);

myApp.value('Color_Value', {
	Red : {
		value: 'darkRed'
	},
	Blue : {
		value: 'darkBlue'
	},
	Green : {
		value: 'darkGreen'
	},
	Yellow : {
		value: 'darkYellow'
	}
});

myApp.value('Game_Status', {
	Begin : {
		value: "Let's Begin!",
		status: "3.... 2..... 1...."
	},
	Simon : {
		value: "Simon's Turn!",
		status: "Current Simon Sequence"
	},
	You : {
		value: "You're Turn!",
		status: "Your Current Sequence"
	},
	Lose : {
		value: "Good job! You're Score was: ",
		status: "Incorrect! Game Over!"
	},
	Start : {
		value: "Press the Start Button to play Simon!",
		status: "Welcome to Simon!"
	}
});

myApp.factory('BoardDTO', ['$timeout', '$interval', 'Game_Status', function($timeout, $interval, Game_Status) {

	function BoardDTO() {
		this.userColors = [];
		this.simonColors = [];
		this.score = 0;
		this.level = 0;
		this.indexNum = 0;
		this.gameStatus = Game_Status;
	};

	BoardDTO.prototype.addSimonColor = function() {
		var self = this;
		self.score++;
		self.level++;

		$timeout(function() {

			$interval(function() {
				var newColor = Math.floor((Math.random() * 4) + 1);
				var divSelector = ['.red', '.green', '.yellow', '.blue'];
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

		self.userColors.push({
			value: boxcolor
		});

		self.compareColors(self.indexNum);
		self.indexNum++;

		console.log(self.userColors);
	};

	BoardDTO.prototype.compareColors = function(index) {
		var self = this;

		if(self.userColors[index].value != self.simonColors[index].value) {
			console.log(index);
			self.gameStatus = Game_Status.Lose.status;
			console.log("Game Over!");
			console.log(self.gameStatus);
		}
	};

	BoardDTO.prototype.getColors = function() {
		return this.userColors;
	};

	BoardDTO.prototype.getLevel = function() {
		return this.level;
	};

	return BoardDTO;
}]);



















/*myApp.factory('SimonDTO', ['$timeout', '$interval', function($timeout, $interval) {

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
		}, 3000);
		this.turn = "Simon's Turn!";

		this.turn = "You're Turn!";

		this.turn = "Game Over!";

	};


	return SimonDTO;
}]);*/