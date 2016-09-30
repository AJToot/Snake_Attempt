function Circle (centre,radius,colour,filled){
  this.centre = centre;
  this.radius = radius;
  this.colour = colour;
  this.filled = filled;
}

Circle.prototype.draw = function(){
  ctx.beginPath();
  ctx.arc(this.centre[0], this.centre[1], this.radius, 0, Math.PI*2, false);

  if(this.filled){
    ctx.fillStyle = this.colour;
    ctx.fill();
  }
  else{
    ctx.strokeStyle = this.colour;
    ctx.stroke();
  }
  ctx.closePath();
}

function getRand(max) {
  max = max - 10;
  var rand = Math.random() * max;
  rand = Math.round((rand)/20) * 20;
  rand = rand + 10;
  return  rand;
}

function main(){

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  var direction;
  var snake;
  var history;
  var berry;
  var finish;
  var totalScore;

  start();
}

function keyDownHandler(e) {
    if(e.keyCode == 68) {
      direction = "right";
    }
    else if(e.keyCode == 65) {
      direction = "left";
    }
    else if(e.keyCode == 87) {
      direction = "up";
    }
    else if(e.keyCode == 83) {
      direction = "down";
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 68) {
        //direction = undefined;
    }
    else if(e.keyCode == 65) {
        //direction = undefined;
    }
    else if(e.keyCode == 87) {
        //direction = undefined;
    }
    else if(e.keyCode == 83) {
        //direction = undefined;
    }
}

function start(){

        direction = "up";

        snake = [];

        history = [];

        tempHistory = null;

        berry = new Circle([getRand(canvas.width),getRand(canvas.height)],5,"red",true);

        Body(snake);

        finish = setInterval(play,100);

        totalScore = 0;
}

function Body (snake){
  var centre;
  var length = snake.length;
  //alert(length);
  if(length != 0){
    centre = JSON.parse(JSON.stringify(snake[(length -1)].centre));
    alert(snake[(length -1)].centre);
  }
  else{
    centre = [canvas.width/2,canvas.height/2];
  }
  //alert(snake[(length -1)].centre);
  snake[length] = new Circle(centre,10,"blue",true);
  alert(centre);
}

function play(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  berry.draw();
  score = scored(berry);
  move(score);
}

function move(score){
  var tempHistory = [];

  for(n=0; n < snake.length; n++){
    tempHistory[n] = history[n];
  }

  history[0] = direction;
  for(var j =1; j < snake.length; j++){
    history[j] = tempHistory[j-1];
  }

  tempHistory = null;

  if(score){
    new Body(snake);
  }

  for(var i =0; i < snake.length; i++){

    var XnY = snake[i].centre;

    XnY[0] = step(XnY[0],"right","left", history[i], canvas.width);
    //XnY[0] = step(XnY[0],"left",false, history[i]);
    XnY[1] = step(XnY[1],"down","up", history[i], canvas.height);
    //XnY[1] = step(XnY[1],"up",false, history[i]);

    snake[i].draw();
    collision(snake[i],i);
  }
}

function step(xOrY, direction1, direction2, face, edge){
    if(face == direction1){
        xOrY += 20;
      }
    else if(face == direction2){
        xOrY -= 20;
      }
    if(xOrY > edge){
      gameOver();
    }
    else if(xOrY < 10){
      gameOver();
    }
    return xOrY;
}

function scored(berry){

  bCentre = berry.centre;
  sCentre = snake[0].centre;
  if(bCentre[0] < sCentre[0] +5 && bCentre[0] > sCentre[0] -5 && bCentre[1] < sCentre[1] +5 && bCentre[1] > sCentre[1] -5){
    bCentre[0] = getRand(canvas.width);
    bCentre[1] = getRand(canvas.height);
    return true;
  }
  else{
    return false;
  }

}
function collision(s,i){
  for(var j =0; j < snake.length; j++){
    if (i != j && s.centre[0] == snake[j].centre[0] && s.centre[1] == snake[j].centre[1]){

        gameOver();


    }
  }
}

function gameOver(){
  //alert("Over");
  clearInterval(finish);
  //alert("finished???");
  main();
}
