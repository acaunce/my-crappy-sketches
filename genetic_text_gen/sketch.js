var target = "Many Bothans Died";
var elementsCount = 1000;
var population;
var generations = 0;
var mutationRate = 0.1;

function setup(){
  createCanvas(400,800);
  population = new Population(target, elementsCount, mutationRate);
}

function draw(){
  background(50);
  var str = "";

  generations ++;
  str += ("generation: " + this.generations);

  population.calcFitness();
  population.eval();

  str += "\r\nmax fitness: " + population.maxFitness;
  str += "\r\n\r\nbest guess: " + population.bestGuess;
  str += "\r\n";

  if(population.bestGuess === target){
    noLoop();
  }  else {
    population.breed();
  }

  stroke(255);
  fill(255);
  textFont("monospace");
  text(str, 20,20);

//noLoop();

}
String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}
