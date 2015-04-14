var Card = function() {
	var name = undefined;
	var id = undefined;
	var image = undefined;
	var spriteXPos = undefined;
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
		messageString: "JS-Memory-Game",
		score: 0,
		solved: undefined,
		getRandomNumber: function() {
    		return Math.floor(Math.random() * (this.cardsLength - 1 + 1)) + 1;
		},
		initializeCardGrid: function() {
			CardObject.canvas = document.getElementById("canvas");
			CardObject.context = canvas.getContext("2d");
			CardObject.context.fillStyle = "#FFF";
			CardObject.context.strokeStyle = "#888";
			CardObject.canvas.addEventListener("mousedown", function(event) {
				CardObject.imageClicked(event);
			}, false);
			solved = false;
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
					card.name = cardsData[randomNumber].name;
					card.id = i;
					card.spriteXPos = cardsData[randomNumber].xPos;
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
					} else if (clickedCardsArray.length ==  1
						&& clickedCardsArray[0].id
						!= cardsArray[i].id) {
						cardsArray[i].hidden = false;
						clickedCardsArray.push(cardsArray[i]);
					}

					console.log("cardsArray[i].id: " + cardsArray[i].id);
					console.log("clickedCardsArray[0].id: " + clickedCardsArray[0].id);
				}
			}

			if (clickedCardsArray.length == 2) {
				if (clickedCardsArray[0].name == clickedCardsArray[1].name) {
					if (solved == false) {
						CardObject.messageString = "Found a match!";
						CardObject.score += 100;
						solved = true;
					}
				} else {

					window.setTimeout(function(){
						for (var i = 0; i < cardsArray.length; i++) {
							cardsArray[i].hidden = true;
						}

						clickedCardsArray.length = 0;
						CardObject.drawCardGrid(cardsArray);
					}, 1000);
					CardObject.messageString = "Didn't find a match";
				}
			}
			//console.log(clickedCardsArray.length);
			CardObject.updateMessageText("message-text", CardObject.messageString);
			CardObject.updateMessageText("score", CardObject.score);
			CardObject.drawCardGrid(cardsArray);
		},
		drawCardGrid: function(cardsArray) {

			for (var i = 0; i < cardsArray.length; i++) {
				var randomCard = cardsArray[i];

				CardObject.context.drawImage(CardObject.html5Image, randomCard.spriteXPos, 0, 
					100, 100, randomCard.xPos, randomCard.yPos, 100, 100);

				if (randomCard.hidden == true) {
					CardObject.context.strokeRect(randomCard.xPos, randomCard.yPos, 100, 100);
					CardObject.context.fillRect(randomCard.xPos, randomCard.yPos, 100, 100);
				}
				//console.log("card hidden: " + randomCard.hidden);
			}
			
		},
		bindResetButton: function() {
			var button = document.getElementById("reset-button");
			button.onclick = function() {
				for (var i = 0; i < cardsArray.length; i++) {
					cardsArray[i].hidden = true;
				}

				clickedCardsArray.length = 0;
				//CardObject.drawCardGrid(cardsArray);

				solved = false;
				cardsArray.length = 0;
				clickedCardsArray.length = 0;
				CardObject.createCardObjects();
				CardObject.messageString = "Cards reset.";
				CardObject.updateMessageText("message-text", CardObject.messageString);
			}
		},
		updateMessageText: function(element, message) {
			document.getElementById(element).innerHTML = message;
		},
		getCardData: [{
			name: "Empty",
			xPos: 0
		},{
			name: "Battery",
			xPos: 0
		},{
			name: "Audio Ports",
			xPos: 100
		},{
			name: "Breadboard",
			xPos: 200
		},{
			name: "Breadboard/Jumper Wires",
			xPos: 300
		},{
			name: "Electrolytic Capacitor",
			xPos: 400
		},{
			name: "Ceramic Capacitor",
			xPos: 500
		},{
			name: "Diode",
			xPos: 600
		},{
			name: "Ethernet Cable",
			xPos: 700
		},{
			name: "5-inch Floppy Drive",
			xPos: 800
		},{
			name: "Hard Disk Drive Headers",
			xPos: 900
		},{
			name: "Large Jumper Cables",
			xPos: 1000
		},{
			name: "Small Jumper Cables",
			xPos: 1100
		},{
			name: "Jumper Wire Bundle",
			xPos: 1200
		},{
			name: "Green LED",
			xPos: 1300
		},{
			name: "Red LED",
			xPos: 1400
		},{
			name: "Tricolor LED",
			xPos: 1500
		},{
			name: "RAM Memory Stick",
			xPos: 1600
		},{
			name: "Mini USB",
			xPos: 1700
		},{
			name: "Mini Motor",
			xPos: 1800
		},{
			name: "Buzzer Motor",
			xPos: 1900
		},{
			name: "Oscillator",
			xPos: 2000
		},{
			name: "PCI Slots",
			xPos: 2100
		},{
			name: "Photoresistor",
			xPos: 2200
		},{
			name: "Piezo Buzzer",
			xPos: 2300
		},{
			name: "Rotary Potentiometer",
			xPos: 2400
		},{
			name: "Power Supply Unit",
			xPos: 2500
		},{
			name: "Pressure Sensor",
			xPos: 2600
		},{
			name: "Printer Connector",
			xPos: 2700
		},{
			name: "Protoboard",
			xPos: 2800
		},{
			name: "PS/2 Ports",
			xPos: 2900
		},{
			name: "PSU Plug",
			xPos: 3000
		},{
			name: "Resistor",
			xPos: 3100
		},{
			name: "Ribbon Cable",
			xPos: 3200
		},{
			name: "Servomotor",
			xPos: 3300
		},{
			name: "Sleep Switch Display",
			xPos: 3400
		},{
			name: "Speaker",
			xPos: 3500
		},{
			name: "Switch (DPDT)",
			xPos: 3600
		},{
			name: "Switch (SPST)",
			xPos: 3700
		},{
			name: "Thermistor",
			xPos: 3800
		},{
			name: "Tilt Sensor",
			xPos: 3900
		},{
			name: "Transformer",
			xPos: 4000
		},{
			name: "Transistor (NPN)",
			xPos: 4100
		},{
			name: "Type A USB Connector",
			xPos: 4200
		},{
			name: "Type B USB Connector",
			xPos: 4300
		},{
			name: "VGA Connector",
			xPos: 4400
		}]

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