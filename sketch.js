'use strict';
var h;
var w;


var past;
var now;
var col;
var newgesture = true;
var endgesture = true;
var touched = false;
var autodrawinit = true;



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

  past = createVector(0, 0);
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
    newgesture = true;
    touched = true;
    return false;
}

var touchMoved= function(){
  pressed(touchX,touchY);
  return false;
}

var touchEnded= function(){
  pressed(touchX,touchY);
  endgesture = true;
  return false;
}

var initCover = function(){
  var recw = 20;
  var numr = h/recw;

  background(0,0,0);
  for(var i =0; i<numr;i++){
     fill(0,0,1);
     rect(0,recw*i,w,recw/2)
  }
}

var pressed= function(x,y){
  now = createVector(x,y);
  if(newgesture){
    past = now;
    past.p1 = createVector(0,0);
    past.p2 = createVector(0,0);
    past.n1= createVector(0,0);
    past.n2= createVector(0,0);
    past.r = 0;
    newgesture = false;

    initCover();
  }
  drawCircle(now);
}


var drawCircle = function(now){
    var diff = now.y - past.y;
    if((diff) > 0){
      col = color(0,0,1);
    } else if (diff <0){
      col = color(0,0,0);
    }

    /*
      col = color(0,0,1);
    var diffv = p5.Vector.sub(now,past);
    var ang = atan(diffv.y, diffv.x);
    ang = (1+(ang/90))/2;
    console.log(ang);
    col = color(0,0,ang);
    */

    var diffv = p5.Vector.sub(now,past);

    var dist = now.dist(past);


    var inputproc = min(pow(abs(diffv.y)-abs(diffv.x/2),1/2),14);

    //if(abs(diffv.x*4)<abs(diffv.y)){

    if((diffv.x)>2){
        console.log('test');
        //inputproc = min(inputproc,5);
        }
    var r = inputproc*(10);
    //ellipse(now.x,now.y,r,r);



    if(dist==0){
      r = past.r;
    }
    now.r = r;

    /*
    line(now.x,now.y,past.x, past.y)
    noFill();
    stroke(col);
    strokeWeight(2);
    */

    //perpendicular
    var n1 = createVector(-1*diffv.y, diffv.x);
    var n2 = createVector(diffv.y, -1*diffv.x);

    if(n1.mag()==0){
      n1 = past.n1;
      n2 = past.n2;
    }

    var p1 = p5.Vector.add(now,n1.normalize().mult(r/2));
    var p2 = p5.Vector.add(now,n2.normalize().mult(r/2));
    now.p1 = p1;
    now.p2 = p2;
    now.n1 = n1;
    now.n2 = n2;

    /*
    line(p1.x,p1.y,p2.x, p2.y)
    noFill();
    stroke(col);
    */

    //shape
    stroke(col);
    fill(col);

    beginShape();
    vertex(past.p1.x,past.p1.y);
    vertex(past.p2.x,past.p2.y);

    vertex(now.p2.x,now.p2.y);
    vertex(now.p1.x,now.p1.y);
    endShape(CLOSE);

    //circles
    var numCirc = 1;
    if(r>4){
        numCirc = diffv.mag()/(r/4);
    }

    for(var i=0; i<numCirc; i++){

      stroke(col);
      fill(col);
      var cx =lerp(past.x, now.x, i/numCirc);
      var cy =lerp(past.y, now.y, i/numCirc);
      var cr =lerp(past.r, r, i/numCirc);
      ellipse(cx,cy,cr,cr);
    }


    //shift in time
    past = now;
}

var autox;
var autoy;
var autoang;
var autospeed;
var angspeed;

var initAuto = function(){
      autoang = random(360);
      autospeed = random(5,30);
      angspeed = random(-10,10);
}

var draw = function(){
  if(touchIsDown || mouseIsPressed){
    if(endgesture){
      newgesture = true;
      endgesture = false;
    }
  }
  if(!touched){
    if(autodrawinit){
      newgesture = true;
      autodrawinit= false;
      autox = w/2;
      autoy = h/2;
      initAuto();
    }
    autox+=autospeed*cos(autoang);
    autoy+=autospeed*sin(autoang);
    autoang+=angspeed;

    if(frameCount%10==0){
      initAuto();
    }

    if(autoy>h || autoy<0 || autox > w || autox <0){
      autoang+=180;
      autoang%=360;
    }


    pressed(autox, autoy);
  }
}

