var canvas;
var context;

var x = 0;
var y = 0;

var dx = 0;
var dy = 0;

window.onload = function() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  //drawMaze("4.png",13, 13);
	loadEasy();
  window.onkeydown = processKey;
};


var timer;

function drawMaze(mazeFile, startingX, startingY) {
  
  clearTimeout(timer);

 
  dx = 0;
  dy = 0;


  var imgMaze = new Image();
  imgMaze.onload = function() {
    
    canvas.width = imgMaze.width;
    canvas.height = imgMaze.height;

    context.drawImage(imgMaze, 0,0);

  
    x = startingX;
    y = startingY;

    var imgFace = document.getElementById("face");
    context.drawImage(imgFace, x, y);
    context.stroke();

   
    timer = setTimeout(drawFrame, 10);
  };
  imgMaze.src = mazeFile;
}


function processKey(e) {

  dx = 0;
  dy = 0;

  
  if (e.keyCode == 38) {
    dy = -1;
  }

  if (e.keyCode == 40) {
    dy = 1;
  }

  if (e.keyCode == 37) {
    dx = -1;
  }

  if (e.keyCode == 39) {
    dx = 1;
  }
}

function checkForCollision() {
  var imgData = context.getImageData(x-1, y-1, 17, 17);
  var pixels = imgData.data;

  for (var i = 0; n = pixels.length, i < n; i += 4) {
    var red = pixels[i];
    var green = pixels[i+1];
    var blue = pixels[i+2];
    

    if (red == 0 && green == 0 && blue == 0) {
      return true;
    }
    
  }
  return false;
}


function drawFrame() {
  if (dx != 0 || dy != 0) {
    context.beginPath();
    context.fillStyle = "rgb(254,244,207)";
    context.rect(x, y, 15, 15);
    context.fill()
	context.closePath();
	


    x += dx;
    y += dy;

    if (checkForCollision()) {
      x -= dx;
      y -= dy;
      dx = 0;
      dy = 0;
	  
    }

   var imgFace = document.getElementById("face");
    context.drawImage(imgFace, x, y);

    if (y > (canvas.height - 72)&& x > (canvas.width - 42)) {
      alert("ТЫ ПОБЕДИЛ!");
      return;
    }
  }

  timer = setTimeout(drawFrame, 10);
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function loadEasy() {
	var rndom=getRandomInt(15);
  drawMaze('maze'+rndom+'.png', 33, 13);
}

