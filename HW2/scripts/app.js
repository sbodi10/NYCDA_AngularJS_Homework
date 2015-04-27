//Swami Shreeji
var myApp = angular.module('myApp', []);

myApp.controller('myController', ['$scope', '$timeout', '$interval', 'Color_Value', 'Game_Status', 'BoardDTO', '$log', function($scope, $timeout, $interval, Color_Value, Game_Status, BoardDTO, $log) {

	//Intialize Views
	$scope.board = new BoardDTO();
	$scope.colorOptions = Color_Value;
	$scope.board.gameUpdate = $scope.board.getGameStatus();
	$scope.board.sequence = $scope.board.getSequence();
	$scope.board.level = $scope.board.getLevel();
	$scope.board.currentSelection = $scope.board.getCurrentSelection();
	$scope.board.buttonDisable = $scope.board.getButtonDisabled();
	$scope.board.user = $scope.board.getUserStatus();
	$scope.board.simon = $scope.board.getSimonStatus();

	//Start Button -> Starts Game
	$scope.startGame = function() {
		console.log("Starting Game!");
		console.log("3");
		console.log("2");
		console.log("1");
		$scope.board.addSimonColor();
	};

	$scope.userSelect = function(color) {
		$scope.board.addUserColor(color);
	};

	$scope.darkColor = function(dark) {
		$scope.board.currentSelection = dark;
	};

	$scope.lightColor = function() {
		$scope.board.currentSelection = '';
	}

	$scope.shouldHighlight = function(actual, desired) {
		return actual == desired;
	}

}]);

myApp.value('Color_Value', {
	Red : {
		value: 'darkRed',
		color: 'Red'
	},
	Blue : {
		value: 'darkBlue',
		color: 'Blue'
	},
	Green : {
		value: 'darkGreen',
		color: 'Green'
	},
	Yellow : {
		value: 'darkYellow',
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
		this.score = 0;
		this.level = 0;
		this.indexNum = 0;
		this.userColors = [];
		this.simonColors = [];
		this.buttonDisable = false;
		this.simonStatus = true;
		this.userStatus = false;
		this.currentSelection = '';
		this.sequence = Game_Status.Start.status;
		this.gameStatus = Game_Status.Start.value;
	};

	BoardDTO.prototype.addSimonColor = function() {
		//UPDATES LEVEL, STATUS OF SIMON'S TURN, AND HIS SELECTIONS
		var self = this;
		self.buttonDisable = true;
		self.userStatus = false;
		self.simonStatus = true;
		self.level++;
		console.log("Level: " + self.level);
		console.log("Simon's Turn Now");
		self.gameUpdate = Game_Status.Simon.value;
		self.sequence = Game_Status.Simon.status;
		console.log("Before: ");
		console.log(self.simonStatus);
		console.log(self.userStatus);


		//Simon Selects Colors Randomly
		$timeout(function() {
			$interval(function() {
				var temp = Color_Value;
				var keys = Object.keys(temp);
				var random = temp[keys[Math.floor(Math.random() * keys.length)]];

				//RANDOM BOX LIGHTS UP
				self.currentSelection = random.value;
				console.log("Random Color: " + self.currentSelection);
				$timeout(function() {
					console.log("GO BACK TO NORMAL COLOR");
					self.currentSelection = '';
				}, 500);

				self.simonColors.push({
					value: random.color
				});
				console.log(random.color);

			}, 1500, self.level); //Time inbetween each color Simon selects && number of times repeated

		}, 2000); //Time before Simon begin's his turn

		$timeout(function() {
			BoardDTO.userTurn();
		}, 5000);

	};

	BoardDTO.userTurn = function() {
		var self = this;
		self.simonStatus = false;
		self.userStatus = true;
		self.gameUpdate = Game_Status.You.value;
		self.sequence = Game_Status.You.status;
		console.log("Game Update " + self.gameUpdate);
		console.log("Sequence " + self.sequence);
	};

	BoardDTO.simonTurn = function() {
		var self = this;
		self.userStatus = false;
		self.simonStatus = true;
		self.gameUpdate = Game_Status.Simon.value;
		self.sequence = Game_Status.Simon.status;
		console.log("Game Update " + self.gameUpdate);
		console.log("Sequence " + self.sequence);
	};

	BoardDTO.prototype.addUserColor = function(boxcolor) {
		var self = this;

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

		/*Enable Start Game Button
		Display Score
		Display Game Over
		Display Simon's Colors*/
		if(self.userColors[index].value != self.simonColors[index].value) {
			console.log(index);
			console.log("Game Over!");
			console.log(self.gameStatus);
			self.buttonDisable = false;
			self.gameStatus = Game_Status.Lose.status;
			self.userStatus = false;
			self.simonStatus = true;
		}

		else if(self.userColors.length == self.simonColors.length) {
			self.userStatus = false;
			self.simonStatus = true;
			self.gameUpdate = Game_Status.Simon.value;
			self.sequence = Game_Status.Simon.status;
			//Reset User Colors Array for next turn
			self.userColors = [];
			//Go back to Simon's turn
			BoardDTO.simonTurn();
		}

	};

	BoardDTO.prototype.getCurrentSelection = function() {
		return this.currentSelection;
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

	BoardDTO.prototype.getSequence = function() {
		return this.sequence
	};

	BoardDTO.prototype.getGameStatus = function() {
		return this.gameStatus
	};

	BoardDTO.prototype.getButtonDisabled = function() {
		return this.buttonDisable;
	};

	BoardDTO.prototype.getUserStatus = function() {
		return this.userStatus;
	};

	BoardDTO.prototype.getSimonStatus = function() {
		return this.simonStatus;
	};

	return BoardDTO;
}]);
