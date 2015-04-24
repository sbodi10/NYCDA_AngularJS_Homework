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
	$scope.user = $scope.board.getUserStatus();
	$scope.simon = $scope.board.getSimonStatus();

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
		this.userColors = [];
		this.simonColors = [];
		this.buttonDisable = false;
		this.simonStatus = true;
		this.userStatus = false;
		this.currentSelection = '';
		this.score = 0;
		this.level = 0;
		this.indexNum = 0;
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


		//Simon Selects Colors Randomly
		$timeout(function() {
			$interval(function() {
				var temp = Color_Value;
				var keys = Object.keys(temp);
				var random = temp[keys[Math.floor(Math.random() * keys.length)]];

				//RANDOM BOX LIGHTS UP
				self.currentSelection = random.value;
				console.log(self.currentSelection);
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

	};

	BoardDTO.prototype.addUserColor = function(boxcolor) {
		var self = this;
		self.simonStatus = false;
		self.userStatus = true;

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

/*		if(self.userColors[index].value != self.simonColors[index].value) {
			console.log(index);
			self.gameStatus = Game_Status.Lose.status;
			console.log("Game Over!");
			console.log(self.gameStatus);
		}*/

/*		Enable Start Game Button
		Display Score
		Display Game Over
		Display Simon's Colors*/

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




/*myApp.value('GD_COL', {
	kRed: {
		cssOverride: 'darkRed'
	},
	kBlue: {
		cssOverride: 'darkBlue'
	},
	kYellow: {
		cssOverride: 'darkYellow'
	},
	kGreen: {
		cssOverride: 'darkGreen'
	}
});

myApp.controller('gdCtrl', function($scope, GD_COL, BoardDTO) {

	$scope.colorOptions = GD_COL;

	$scope.selectedColors = [];

	$scope.board = new BoardDTO();

	$scope.onHighlight = function(color) {
		$scope.board.currentSelection = color;
	};

	$scope.onSelect = function(color) {
		$scope.selectedColors.push(color);
		$scope.board.currentSelection = null;
	};

	$scope.shouldHighlight = function(actual, desired) {
		return actual == desired;
	}

});
*/