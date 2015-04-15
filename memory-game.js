var Card = function() {
	var index = undefined;
	var name = undefined;
	var id = undefined;
	var image = undefined;
	var xPos = undefined;
	var yPos = undefined;
	var hidden = true;
}

var CardGrid = function() {

	var CardObject = {
		spacing: 10,
		xPos: 0,
		yPos: 0,
		cardsLength: 45,
		canvas: undefined,
		context: undefined,
		html5Image: undefined,
		messageString: "Press a square",
		score: 0,
		solved: undefined,
		cardsActive: undefined,
		getRandomNumber: function() {
    		return Math.floor(Math.random() * (this.cardsLength - 1 + 1)) + 1;
		},
		initializeCardGrid: function() {
			CardObject.canvas = document.getElementById("canvas");
			CardObject.context = canvas.getContext("2d");
			CardObject.context.fillStyle = "#FFFFFF";
			CardObject.context.strokeStyle = "#888888";
      		CardObject.context.textAlign = "center";
			CardObject.canvas.addEventListener("mousedown", function(event) {
				CardObject.imageClicked(event);
			}, false);
			solved = false;
			cardsActive = false;
		},
		createCardObjects: function() {
			CardObject.html5Image = new Image();
			CardObject.html5Image.src = "images/memory-game-spritesheet.jpg";

			CardObject.html5Image.onload = function() {

				for (var i = 0; i < 9; i++) {
					if (i == 0 || i == 1 || i == 2) {
						this.xPos = 25;
					}
					if (i == 3 || i == 4 || i == 5) {
						this.xPos = 150;
					}
					if (i == 6 || i == 7 || i == 8) {
						this.xPos = 275;
					}
					if (i == 0 || i == 3 || i == 6) {
						this.yPos = 25;
					}
					if (i == 1 || i == 4 || i == 7) {
						this.yPos = 150;
					}
					if (i == 2 || i == 5 || i == 8) {
						this.yPos = 275;
					}
					var randomNumber = CardObject.getRandomNumber();
					var card = new Card();
					card.index = cardsData[randomNumber].index;
					card.name = cardsData[randomNumber].name;
					card.id = "card_id_" + i;
					card.xPos = this.xPos;
					card.yPos = this.yPos;
					card.hidden = true;
					cardsArray.push(card);
				}
				CardObject.drawCardGrid(cardsArray);
			}
		},
		imageClicked: function(event) {
			CardObject.context.clearRect(0, 0, CardObject.canvas.width, CardObject.canvas.height);

			for (var i = 0; i < cardsArray.length; i++) {
				if (event.pageX >= cardsArray[i].xPos
					&& event.pageX <= cardsArray[i].xPos + 100
					&& event.pageY >= cardsArray[i].yPos
					&& event.pageY <= cardsArray[i].yPos + 100) {
					if (clickedCardsArray.length == 0) {
						cardsArray[i].hidden = false;
						clickedCardsArray.push(cardsArray[i]);
						cardsActive = true;
					} else if (clickedCardsArray.length ==  1
						&& clickedCardsArray[0].id
						!= cardsArray[i].id) {
						cardsArray[i].hidden = false;
						clickedCardsArray.push(cardsArray[i]);
					}
				}
			}

			if (clickedCardsArray.length == 2) {
				if (clickedCardsArray[0].name == clickedCardsArray[1].name) {
					if (solved == false) {
						CardObject.messageString = "Found a match";
						CardObject.score += 100;
						solved = true;
					}
				} else {
					if (cardsActive == true) {
						window.setTimeout(function(){
							for (var i = 0; i < cardsArray.length; i++) {
								cardsArray[i].hidden = true;
							}

							clickedCardsArray.length = 0;
							CardObject.context.clearRect(0, 0, CardObject.canvas.width, CardObject.canvas.height);
							CardObject.drawCardGrid(cardsArray);
						}, 1000);
						CardObject.messageString = "Didn't find a match";
						cardsActive = false;
					}
				}
			}
			CardObject.updateMessageText("message-text", CardObject.messageString);
			CardObject.updateMessageText("score", CardObject.score);
			CardObject.drawCardGrid(cardsArray);
		},
		drawCardGrid: function(cardsArray) {
			var textPosX;
			var textPosY;
			for (var i = 0; i < cardsArray.length; i++) {
				var randomCard = cardsArray[i];
					textPosX = randomCard.xPos + 50;
					textPosY = randomCard.yPos + 58;
					CardObject.context.font = "55px Arial";
					CardObject.context.fillStyle = "#000000";
					CardObject.context.fillText(randomCard.index, textPosX, textPosY);
					textPosX = randomCard.xPos + 50;
					textPosY = randomCard.yPos + 80;
					CardObject.context.font = "14px Arial";
					CardObject.context.fillText(randomCard.name, textPosX, textPosY);
					CardObject.context.fillStyle = "#FFFFFF";

				if (randomCard.hidden == true) {
					CardObject.context.strokeRect(randomCard.xPos, randomCard.yPos, 100, 100);
					CardObject.context.fillRect(randomCard.xPos, randomCard.yPos, 100, 100);
				}
			}
			
		},
		bindResetButton: function() {
			var button = document.getElementById("reset-button");
			button.onclick = function() {
				for (var i = 0; i < cardsArray.length; i++) {
					cardsArray[i].hidden = true;
				}

				clickedCardsArray.length = 0;
				solved = false;
				cardsArray.length = 0;
				clickedCardsArray.length = 0;
				CardObject.context.clearRect(0, 0, CardObject.canvas.width, CardObject.canvas.height);
				CardObject.createCardObjects();
				CardObject.messageString = "Cards shuffled";
				CardObject.updateMessageText("message-text", CardObject.messageString);
			}
		},
		updateMessageText: function(element, message) {
			document.getElementById(element).innerHTML = message;
		},
		getCardData: [{
			index: "NULL",
			name: "NULL"
		},{
			index: 0,
			name: "Zero"
		},{
			index: 1,
			name: "One"
		},{
			index: 2,
			name: "Two"
		},{
			index: 3,
			name: "Three"
		},{
			index: 4,
			name: "Four"
		},{
			index: 5,
			name: "Five"
		},{
			index: 6,
			name: "Six"
		},{
			index: 7,
			name: "Seven"
		},{
			index: 8,
			name: "Eight"
		},{
			index: 9,
			name: "Nine"
		},{
			index: 10,
			name: "Ten"
		},{
			index: 11,
			name: "Eleven"
		},{
			index: 12,
			name: "Twelve"
		},{
			index: 13,
			name: "Thirteen"
		},{
			index: 14,
			name: "Fourteen"
		},{
			index: 15,
			name: "Fifteen"
		},{
			index: 16,
			name: "Sixteen"
		},{
			index: 17,
			name: "Seventeen"
		},{
			index: 18,
			name: "Eighteen"
		},{
			index: 19,
			name: "Nineteen"
		},{
			index: 20,
			name: "Twenty"
		},{
			index: 21,
			name: "Twenty-One"
		},{
			index: 22,
			name: "Twenty-Two"
		},{
			index: 23,
			name: "Twenty-Three"
		},{
			index: 24,
			name: "Twenty-Four"
		},{
			index: 25,
			name: "Twenty-Five"
		},{
			index: 26,
			name: "Twenty-Six"
		},{
			index: 27,
			name: "Twenty-Seven"
		},{
			index: 28,
			name: "Twenty-Eight"
		},{
			index: 29,
			name: "Twenty-Nine"
		},{
			index: 30,
			name: "Thirty"
		},{
			index: 31,
			name: "Thirty-One"
		},{
			index: 32,
			name: "Thirty-Two"
		},{
			index: 33,
			name: "Thirty-Three"
		},{
			index: 34,
			name: "Thirty-Four"
		},{
			index: 35,
			name: "Thirty-Five"
		},{
			index: 36,
			name: "Thirty-Six"
		},{
			index: 37,
			name: "Thirty-Seven"
		},{
			index: 38,
			name: "Thirty-Eight"
		},{
			index: 39,
			name: "Thirty-Nine"
		},{
			index: 40,
			name: "Forty"
		},{
			index: 41,
			name: "Forty-One"
		},{
			index: 42,
			name: "Forty-Two"
		},{
			index: 43,
			name: "Forty-Three"
		},{
			index: 44,
			name: "Forty-Four"
		},{
			index: 45,
			name: "Forty-Five"
		},{
			index: 46,
			name: "Forty-Six"
		},{
			index: 47,
			name: "Forty-Seven"
		},{
			index: 48,
			name: "Forty-Eight"
		},{
			index: 49,
			name: "Forty-Nine"
		},{
			index: 50,
			name: "Fifty"
		},]
	};
	return {
		initializeCardGrid: CardObject.initializeCardGrid,
		createCardObjects: CardObject.createCardObjects,
		drawCardGrid: CardObject.drawCardGrid,
		getCardData: CardObject.getCardData,
		bindResetButton: CardObject.bindResetButton
	}
}

var grid = new CardGrid();
var cardsData;
var cardsArray = [];
var clickedCardsArray = [];

document.addEventListener("DOMContentLoaded", function(event) {
	grid = new CardGrid();
	cardsData = grid.getCardData;
	cardsArray = [];
	clickedCardsArray = [];
	grid.initializeCardGrid();
	grid.createCardObjects();
	grid.bindResetButton();
});