'use strict';
var h;
var w;

var up = false;

var p= {"x":0, "y":0};
var col;

var setup = function(){
  colorMode(HSB, 360,1,1)
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  col = color(0,0,1);
  w = windowWidth;
  h = windowHeight;

  //disable default touch events for mobile
  var el = document.getElementsByTagName("canvas")[0];
  el.addEventListener("touchstart", pdefault, false);
  el.addEventListener("touchend", pdefault, false);
  el.addEventListener("touchcancel", pdefault, false);
  el.addEventListener("touchleave", pdefault, false);
  el.addEventListener("touchmove", pdefault, false);

  background(color(0,0,0));
  initCover();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function pdefault(e){
  e.preventDefault()
}

var touchStarted= function(){
    p.x = touchX;
    p.y = touchY;

  pressed(touchX,touchY);
}

var touchMoved= function(){
  pressed(touchX,touchY);
}

var touchEnded= function(){
  pressed(touchX,touchY);
}

var calcDist = function(past,now){
  return sqrt(pow(past.x-now.x,2) + pow(past.y - now.y,2));
}


var pressed= function(x,y){
  drawCircle(x,y);
}

var initCover = function(){
  var num = 1000;

  for(var i =0; i<num;i++){
    col=color(0,0,floor(random(0,2)));
    ellipse(random(w),random(h),50,50);
    fill(col);
    stroke(col);
  }

}

var drawCircle = function(x,y){
    var diff = y - p.y;
    if((diff) > 0){
      up=false;
      col = color(0,0,1);
    } else if (diff <0){
      up = true;
      col = color(0,0,0);
    }


    var dist = calcDist(p,{"x":x, "y":y});
    var r = map(sqrt(min(abs(dist),100)),0,5,5,100);
    ellipse(x,y,r,r);
    fill(col);
    stroke(col);

    p.x = x;
    p.y = y;
}

var draw = function(){

}

