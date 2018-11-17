var myGamePiece;

//Left, Up, Right, Down
var keys= ['false','false','false','false'];

window.addEventListener("keydown", function(event) {
	keys[event.keyCode-37] = true;
	console.log(event.keyCode);
}, true);

window.addEventListener("keyup", function(event) {
	keys[event.keyCode-37] = false;
}, true);

var moveSpeed=5;

	

function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "red", 10, 100);
}



var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1200;
        this.canvas.height = 550;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
	this.interval = setInterval(updateGameArea, 20);
    },
	clear: function(){
		this.context.clearRect(0,0, this.canvas.width, this.canvas.height);

	}
}


function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;  
	this.x=x;
	this.y=y;
	this.update = function(){
   	 ctx = myGameArea.context;
    	ctx.fillStyle = color;
   	 ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	/*this.newPos = function(){
		this.x = 600;
		this.y = 225;
	}*/
}
function updateGameArea(){
	myGameArea.clear();
	//myGamePiece.newPos();
	myGamePiece.update();
	checkKeys();
	gravity();
}

function moveUp(){
	if(myGamePiece.y==0){
		myGamePiece.y+=0;
	}
	else{
		myGamePiece.y -=moveSpeed;
	}
	
}
function moveDown(){
	
	if(myGamePiece.y==550){
		myGamePiece.y+=0;
	}
	else{
		myGamePiece.y +=moveSpeed;
	}
}
function moveLeft(){
	
	if(myGamePiece.x==0){
		myGamePiece.x-=0;
	}
	else{
		myGamePiece.x -= moveSpeed;
	}	
}
function moveRight(){
	if(myGamePiece.x>=1200){
		myGamePiece.x-=0;
	}
	else{
		myGamePiece.x += moveSpeed;
	}
}
	
function jump(){
	/*var jump = 10;
	this.interval = clearInterval(updateGameArea);
	if(myGamePiece.y >= 460){
		myGamePiece.y -=jump;
		jump -=1;
	}
	this.interval = setInterval(updateGameArea, 20);*/

	/*for(var i = 0; i < 10; i++) {
		myGamePiece.y -= i;
	}*/
	
	if(myGamePiece.y == 400) {
		for(var i = 0; i < 10; i++) {
			myGamePiece.y -= i;
		}
		console.log('jump');	
	}
}

var g = 0;

function gravity() {
	if(myGamePiece.y < 400) {
		if(400 - g < myGamePiece.y) {
			myGamePiece.y = 400;
			g = 1;
		}
		else {
			myGamePiece.y += g;
			g += 1;
		}
	}
	//console.log(g);
	//console.log(myGamePiece.y);
}

function checkKeys(){
	
	if (keys[0]){
	moveLeft();
	}
	if (keys[2]){
	moveRight();
	}
	if (keys[1]){
	jump();
	}	

	
}	
