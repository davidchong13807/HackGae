var myGamePiece;
var health = 100;
var boss;
//Left, Up, Right, Down
var keys = [];
var projectileArr = [100];

function startGame() {
    myGameArea.start();
    myGamePiece = new component(140, 110, "red", 100, 400);
    boss= new component(600, 550, "blue", 600, 0);
    createProjectiles();
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

var counter = 0;
function updateGameArea() {
	myGameArea.clear();
	boss.update();
	myGamePiece.update();
	
	for(var i = 0; i < 40; i++) {
		projectileArr[i].update();
		moveProjectile(projectileArr[i]);
		projectileHit(projectileArr[i]);
	}	

	checkKeys();
	gravity();
		
	if(counter > 550) {
		counter = 0;
	}
	
	cycleProjectiles(counter);
	counter++;
	
}

function cycleProjectiles(counter) {
	switch(counter) {
		case 0: 
			spawnProjectilesSet(projectileArr, 0, 8);
			break;
		case 50:
			spawnProjectilesSet(projectileArr, 20, 25);
			break;
		case 150: 
			spawnProjectilesSet(projectileArr, 10, 18);
			break;
		case 220:
			spawnProjectilesSet(projectileArr, 30, 31);
			break;
		case 240:
			spawnProjectilesSet(projectileArr, 31, 32);
			break;
		case 260:
			spawnProjectilesSet(projectileArr, 32, 33);
			break;
		case 280:
			spawnProjectilesSet(projectileArr, 33, 34);
			break;
		case 300: 
			spawnProjectilesSet(projectileArr, 34, 35);
			break;
		case 320:
			spawnProjectilesSet(projectileArr, 39, 40);
			break;
		case 340:
			spawnProjectilesSet(projectileArr, 38, 39);
			break;
		case 360:
			spawnProjectilesSet(projectileArr, 37, 38);
			break;
		case 380:
			spawnProjectilesSet(projectileArr, 36, 37);
			break;
		case 380: 
			spawnProjectilesSet(projectileArr, 35, 36);
			break;
		case 400: 
			spawnProjectilesSet(projectileArr, 30, 31);
			break;
		case 420:
			spawnProjectilesSet(projectileArr, 31, 32);
			break;
		case 440:
			spawnProjectilesSet(projectileArr, 32, 33);
			break;
		case 460:
			spawnProjectilesSet(projectileArr, 33, 34);
			break;
		case 480:
			spawnProjectilesSet(projectileArr, 34, 35);
			break;
	}
}

function spawnProjectilesSet(arr, start, end) {
	for(var i = start; i < end; i++) {
		arr[i].x = 1100;
		arr[i].y = 70;
	}
} 

function createProjectiles() {
	deltaTheta = 11.25 * Math.PI / 180;
	for(var i = 0; i < 10; i++) {
		projectileArr[i] = new projectileComponent(20, 20, 'green', -1000, -1000, fanPattern());		
	}
	
	theta = 0;
    	for(var i = 10; i < 20; i++) {
		projectileArr[i] = new projectileComponent(20, 20, 'green', -1000, -1000, fanPattern());	
   	}

	deltaTheta = Math.PI / 10;
	theta = 0;
	for(var i = 20; i < 25; i++) {
		projectileArr[i] = new projectileComponent(20, 20, 'green', -1000, -1000, fanPattern());
	}

	theta = Math.PI / 9;
	deltaTheta = Math.PI / 15;
	for(var i = 25; i < 30; i++) {
		projectileArr[i] = new projectileComponent(20, 20, 'green', -1000, -1000, fanPattern());
	}

	deltaTheta = Math.PI / 20;
	theta = 0;
	for(var i = 30; i < 40; i++) {
		projectileArr[i] = new projectileComponent(20, 20, 'green', -1000, -1000, fanPattern());		
	}
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

function projectileComponent(width, height, color, x, y, dir) {
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
	this.dir = dir;
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
	if(object.x > -500 && object.x < 1500) {
		object.x += moveSpeed * x;
	}
}

function moveY(object, y) {
	if(object.y > -500 && object.y < 1000) {
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
	if(object.x > -1000 && object.y > -1000) {
		moveX(object, object.dir[0]);
		moveY(object, object.dir[1]);
	}
}

function projectileHit(object) {
	if(myGamePiece.x < (object.x + object.width - 5) && 
	   myGamePiece.x + myGamePiece.width - 15 > object.x &&
	   myGamePiece.y < (object.y + object.height - 5) &&
	   myGamePiece.y + myGamePiece.height - 15 > object.y) {
		health -= 34;
		object.x = -1000;
		object.y = -1000;
	}
	
	if(health <= 0) {
		alert('dead');
	}
}

var theta = 0;
var deltaTheta;
function fanPattern() {
	var dir = [-1 * Math.cos(theta), Math.sin(theta)];
	theta += deltaTheta;
	if(theta == (Math.PI / 2)) {
		theta = 0;
	}
	return dir;
} 


