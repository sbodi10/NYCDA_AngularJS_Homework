//Swami Shreeji
var myApp = angular.module('myApp', []);

myApp.controller('myController', ['$scope', '$timeout', '$interval', 'Color_Value', 'Game_Status', 'BoardDTO', '$log', function($scope, $timeout, $interval, Color_Value, Game_Status, BoardDTO, $log) {

	//Intialize Views
	$scope.board = new BoardDTO();
	//NEED TO FIX THIS
	$scope.boardDisable = true;
	$scope.colorOptions = Color_Value;
	$scope.gameUpdate = Game_Status.Start.value;
	$scope.sequence = Game_Status.Start.status;
	$scope.level = $scope.board.getLevel();
	// $scope.$watch($scope.board.currentSelection, function() {
	// 	$scope.currentSelection = $scope.board.currentSelection;
	// });
	$scope.currentSelection = $scope.board.currentSelection;


	//Start Button -> Starts Game
	$scope.startGame = function() {
		$scope.boardDisable = false;
		$scope.gameUpdate = $scope.board.gameUpdate;
		$scope.sequence = $scope.board.gameUpdate;
		$scope.buttonDisable = true;
		console.log("Starting Game!");
		console.log("3");
		console.log("2");
		console.log("1");
		$scope.board.addSimonColor();
		$scope.level = $scope.board.getLevel();
		$scope.gameUpdate = $scope.board.gameUpdate;
		$scope.sequence = $scope.board.sequence;
	};

	$scope.userSelect = function(model, color) {
		$scope.board.addUserColor(model, color.value);
		$scope.$watch($scope.board.currentSelection, function() {
			$scope.currentSelection = $scope.board.currentSelection;
		});

		if($scope.board.userColors.length == $scope.board.simonColors.length) {
			$scope.board.addSimonColor();
		}
	};

}]);

myApp.value('Color_Value', {
	Red : {
		value: 'darkRed',
		index: '1',
		color: 'Red'
	},
	Blue : {
		value: 'darkBlue',
		index: '2',
		color: 'Blue'
	},
	Green : {
		value: 'darkGreen',
		index: '3',
		color: 'Green'
	},
	Yellow : {
		value: 'darkYellow',
		index: '4',
		color: 'Yellow'
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

myApp.factory('BoardDTO', ['$timeout', '$interval', 'Game_Status', 'Color_Value', function($timeout, $interval, Game_Status, Color_Value) {

	function BoardDTO() {
		this.userColors = [];
		this.simonColors = [];
		this.currentSelection = '';
		this.score = 0;
		this.level = 0;
		this.indexNum = 0;
		this.gameUpdate = '';
		this.sequence = '';
		this.gameStatus = Game_Status;
	};

	BoardDTO.prototype.addSimonColor = function() {
		var self = this;
		self.level++;
		console.log("Level: " + self.level);

		//UPDATES STATUS OF SIMON'S TURN AND HIS SELECTIONS
		console.log("Simon's Turn Now");
		this.gameUpdate = Game_Status.Begin.value;
		this.sequence = Game_Status.Begin.status;

		$timeout(function() {
			this.gameUpdate = Game_Status.Simon.value;
			this.sequence = Game_Status.Simon.status;
		}, 3000);


		$timeout(function() {
			$interval(function() {
				var temp = Color_Value;
				var keys = Object.keys(temp);
				var random = temp[keys[Math.random * keys.length << 0]];

				//RANDOM BOX LIGHTS UP
				this.currentSelection = random.value;
				console.log(this.currentSelection);
				$timeout(function() {
					console.log("GO BACK TO NORMAL COLOR");
					this.currentSelection = random.color;
				}, 500);

				self.simonColors.push({
					value: random.color
				});
				console.log(random.color);

			}, 1500, self.level); //Time inbetween each color Simon selects && number of times repeated


		}, 2000); //Time before Simon begin's his turn

	};

	BoardDTO.prototype.addUserColor = function(boxcolor, darkBoxColorIndex) {
		var self = this;

		self.currentSelection = darkBoxColorIndex;
		$timeout(function() {
			self.currentSelection = '';
		}, 500);

		self.userColors.push({
			value: boxcolor
		});

		self.compareColors(self.indexNum);
		self.indexNum++;

		//Array of Colors
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

		//Enable Start Game Button
		//Display Score
		//Display Game Over
		//Display Simon's Colors

	};

	BoardDTO.prototype.getColors = function() {
		return this.userColors;
	};

	BoardDTO.prototype.getSimonColors = function() {
		return this.simonColors;
	}

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
