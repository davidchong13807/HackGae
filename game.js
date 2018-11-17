var myGamePiece; 

//Left, Up, Right, Down
var keys= [];

window.addEventListener("keydown", function(event){
	keys[event.keyCode] = true;
	console.log(event.keyCode);
}, true);

window.addEventListener("keyup", function(event) {
	keys[event.keyCode] = false;
}, true);

var moveSpeed=5;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(100, 80, "1bun.png", 100, 100, "image")
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


function component(width, height, color, x, y, type) {
 	this.type = type;
	
	if (type == "image") {
		
		this.image = new Image();
		
		this.image.src = color;
	}
	
	this.width = width;
    
	this.height = height;  
	
	this.x=x;
	
	this.y=y;
	
	
	this.update = function(){
   	 
		ctx = myGameArea.context;
    	
		if (type == "image") {
	
			ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	} 
		else {
	ctx.fillStyle = color;
	cts.fillRect(this.x, this.y, this.width, this.height);
	}
	
}


  /* this.width = width;
    this.height = height;  
	this.x=x;
	this.y=y;
	this.update = function(){
   	 ctx = myGameArea.context;
    	ctx.fillStyle = color;
   	 ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	this.newPos = function(){
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

var jumpForce = 20;
var hasJumped = false;
function hop(){
	if(!hasJumped) {
		myGamePiece.y -= jumpForce;
	}
}

function fall() {
	if(myGamePiece.y >= 400) {
		hasJumped = false;
	}
	else {
		hasJumped = true;
		myGamePiece.y -= jumpForce;
	}
}

function checkKeys(){	
	if (keys[37]){
	moveLeft();
	}
	if (keys[39]){
	moveRight();
	}
	if (keys[17]){
	moveSpeed = 15;
	}
	else{
	moveSpeed = 5;
	}
	if (keys[38]){
	hop();
	}	
	if(!keys[38]) {
	fall();
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
