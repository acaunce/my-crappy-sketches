function Journey(route){

  this.route = route;
  this.fitness = 0;

  this.show = function(highlight, genetic){
    beginShape();
    if(highlight){
      if(genetic){
        stroke(0,255,0, 150);
        strokeWeight(5);
      }else{
        stroke(150,0,255);
        strokeWeight(8);
    }
    }else{
      stroke(255);

    }
    noFill();
    for (var i = 0; i < this.route.length; i++) {
      vertex(this.route[i].x, this.route[i].y);
    }
    endShape();
    strokeWeight(1);
  }

  this.setFitness = function(){
    var d = this.distance();
    this.fitness = 1 / pow(d + 0.01, 2);
  }

  this.mate = function(ele){
    var index = floor(random(this.route.length));

    var newRoute = [];

    for (var i = 0; i < this.route.length; i++) {
      var val = this.route[i];

      var j = ele.route.indexOf(val);

      var rnd = floor(random(0,2));
      if(rnd === 1){
        if(!newRoute[j]) newRoute[j] = val;
        else if (!newRoute[i]) newRoute[i] = val;
        else {
          for (var k = 0; k < this.route.length; k++) {
            if(!newRoute[k]){
              newRoute[k] = val;
              k = this.route.length;
              }
            }
          }
        }
      else{
        if(!newRoute[i]) newRoute[i] = val;
        else if(!newRoute[j]) newRoute[j] = val;
        else {
          for (var k = 0; k < this.route.length; k++) {
            if(!newRoute[k]) {
              newRoute[k] = val;
              k = this.route.length;
            }
          }
        }
      }
    }

    return new Journey(newRoute);
  }

  this.mutate = function(mr){
    for (var i = 0; i < this.route.length; i++) {
      if(random(1) < mr){
        this.route.swap(i, floor(random(this.route.length)));
      }
    }
  }

  this.distance = function(){
    var dist = 0;
    for (var i = 0; i < this.route.length - 1; i++) {
      dist+=this.route[i].dist(this.route[i+1]);
    }
    return dist;
  }

}
