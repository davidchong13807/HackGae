var myGamePiece;
var boss;
var projectile;
//Left, Up, Right, Down
var keys= [];

function startGame() {
    myGameArea.start();
    myGamePiece = new component(100, 80, "red", 100, 100);
    boss= new component(600, 550, "blue", 600, 0);
    projectile = new projectileComponent (60, 60, "green", 1100, 70);
	
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
    clear: function() {
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateGameArea(){
	myGameArea.clear();
	boss.update();
	myGamePiece.update();
	projectile.update();
		
	moveProjectile(projectile);	
	projectileHit(projectile);	

	checkKeys();
	gravity();
}

function component(width, height, color, x, y) {
  	this.width = width;
	this.height = height;  
	this.x = x;
	this.y = y;
	this.update = function() {
   		ctx = myGameArea.context;
    		ctx.fillStyle = color;
   		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	this.newPos = function() {
		this.x = 600;
		this.y = 225;
	}
}

function projectileComponent(width, height, color, x, y) {
	this.width = width;
	this.height = height;  
	this.x = x;
	this.y = y;
	this.update = function() {
   		ctx = myGameArea.context;
    		ctx.fillStyle = color;
   		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	this.newPos = function() {
		this.x = 600;
		this.y = 225;
	}
}

window.addEventListener("keydown", function(event) {
	keys[event.keyCode] = true;
	console.log(event.keyCode);
}, true);

window.addEventListener("keyup", function(event) {
	keys[event.keyCode] = false;
}, true);

function checkKeys() {
	if(keys[37]) {
		movePlayerLeft();
	}
	if(keys[39]) {
		movePlayerRight();
	}
	if(keys[17]) {
		moveSpeed = 15;
	}
	else {
		moveSpeed = 5;
	}
	if(keys[38]) {
		hop();
	}	
	else {
		fall();
	}	
}		

var moveSpeed=5;

function moveX(object, x) {
	if(object.x > -100 && object.x < 1200) {
		object.x += moveSpeed * x;
	}
}

function moveY(object, y) {
	if(object.y > -100 && object.y < 500) {
		object.y += moveSpeed * y;
	}
}

function movePlayerLeft() {
	if(myGamePiece.x > 0) {
		myGamePiece.x -= moveSpeed;
	}	
}

function movePlayerRight() {
	if(myGamePiece.x < 1100) {
		myGamePiece.x += moveSpeed;
	}
}

var jumpForce = 20;
var hasJumped = false;
function hop() {
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

function moveProjectile(object) {
	moveX(object, getDir(object)[0]);
	moveY(object, getDir(object)[1]);
	if(object.x < -50 || object.x > 1200 || object.y < 0 || object.y > 600) {
		object.x = 1100;
		object.y = 100;
	}
}

function getDir(object) {
	var deltaX = myGamePiece.x - object.x;
	var deltaY = myGamePiece.y - object.y;
	var distance = Math.sqrt(Math.pow(deltaX, 2), Math.pow(deltaY, 2));
	
	var x = deltaX / distance;
	var y = deltaY / distance;
	var arr = [x, y];
	return arr;
}

function projectileHit(object) {
	if(object.x == myGamePiece.x || object.y == myGamePiece.y) {
		alert('Dead');
	}
}


