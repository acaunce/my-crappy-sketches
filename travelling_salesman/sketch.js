var currentJourney;
var bestJourney;
var currentOrder = [];
var n = 9;
var w = 600;
var h = 800;
var noOf = 0;
var population;
var popSize = 150;
var mutationRate = 0.05;
var geneticBest;
var geneticBestCount = 0;

var points = [];
function setup(){
  createCanvas(w, h);
  for (var i = 0; i < n; i++) {
    points[i] = createVector(random(w), random(h));
    currentOrder[i] = i;
  }
  currentJourney = new Journey(points);
  bestJourney = currentJourney;
  noOf = factorial(n);

  population = new Population(popSize, mutationRate, points);
}
var cnt = 0;
function draw(){
  background(51);
  //noLoop();
  cnt++;
  for (var i = 0; i < points.length; i++) {
    fill(150,0,255);
    noStroke();
    ellipse(points[i].x, points[i].y, 10, 10);
  }
  //console.log(currentJourney.distance());
  //noLoop();
  population.calcFitness();
  population.eval();
  if(!geneticBest) geneticBest = population.bestGuess;
  if(population.bestGuess.fitness > geneticBest.fitness){
    geneticBest = population.bestGuess;
    geneticBestCount = cnt;
  }
  //get a new random Journey
  for (var x = 0; x < popSize; x++) {
    currentOrder = nextOrder(currentOrder);
    if(!currentOrder) {
      noLoop();
      bestJourney.show(true);
      geneticBest.show(true, true);
      text('best distance: ' + bestJourney.distance() + '\r\npercent complete: ' + nf(cnt / noOf * 100, 3, 2) + '%'
      + "\r\nmax fitness: " + nf(population.maxFitness, 6, 2)
      + "\r\ngeneration: " + cnt
      +"\r\ngenetic solution generation: " + geneticBestCount, 20, 20);
      return;
    }
    var newRoute = [];
    for (var i = 0; i < n; i++) {
      newRoute[i] = points[currentOrder[i]];
    }
    currentJourney = new Journey(newRoute);


    if(currentJourney.distance() < bestJourney.distance()){
      bestJourney = currentJourney;
    }
  }
  currentJourney.show(false);
  //bestJourney.show(true);
  if(geneticBest){
    geneticBest.show(true, true);
  }
  stroke(255);
  text('best distance: ' + bestJourney.distance() + '\r\npercent complete: ' + nf((cnt * popSize) / noOf * 100, 3, 2) + '%'
  + "\r\nmax fitness: " + nf(population.maxFitness, 6, 2)
  + "\r\ngeneration: " + cnt
  +"\r\ngenetic solution generation: " + geneticBestCount, 20, 20);

  population.breed();
}

function nextOrder(cur){
  var p = -1;
  for (var i = 0; i < cur.length - 1; i++) {
    if(cur[i] < cur[i+1])
      p = i;
  }
  if (p === -1) return undefined;

  var z = p;
  for (var i = p+1; i < cur.length; i++) {
    if(cur[p] < cur[i])
      z = i;
  }

  cur.swap(p,z);

  var reversePart = cur.slice(p + 1, cur.length);
  reversePart = reversePart.reverse();
  cur = cur.slice(0,p + 1).concat(reversePart);
  return cur;
}

function randomOrder(len){
  var indecies = [];
  for (var i = 0; i < len; i++) {
    indecies[i] = i;
  }

  for (var i = 0; i < len; i++) {
    var swapWith = floor(random(len));
    indecies.swap(i, swapWith);
  }
  return indecies;
}

function factorial(n){
  if(n == 1) return 1;
  return n * factorial(n - 1);
}

Array.prototype.swap = function(a, b){
  var aVal = this[a];
  this[a] = this[b];
  this[b] = aVal;
}
