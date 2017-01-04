function Population(count, mr, points){
  this.elements = [];
  this.length = count;
  this.maxFitness = 0;
  this.bestGuess;
  this.mutationRate = mr;
  this.points = points;

  this.randomJourney = function(p){
    var indecies = randomOrder(p.length);
    var retVal = [];
    for (var i = 0; i < indecies.length; i++) {
      retVal[i] = this.points[indecies[i]];
    }
    return retVal;
  }

  for(var i = 0; i< count; i++){
    this.elements[i] = new Journey(this.randomJourney(points));
  }

  this.calcFitness = function(){
    this.maxFitness = 0;
    for (var i = 0; i< this.elements.length;i++){
      this.elements[i].setFitness();
      if(this.elements[i].fitness > this.maxFitness){
        this.maxFitness = this.elements[i].fitness;
      }
    }
  }

  this.eval = function(){
    var recordFitness = 0;
    var bestGuess;
    for(var i = 0; i < count; i++){
      if(this.elements[i].fitness > recordFitness){
        recordFitness = this.elements[i].fitness;
        bestGuess = this.elements[i];
      }
    }

    this.bestGuess = bestGuess;
  }
  this.breed = function(){
    var newPopulation = [];
    //iterate all of the elements
    for (var i = 0; i< this.elements.length;i++){
      //pick random parents based on fitness
      var parentA = this.getParent();
      var parentB = this.getParent();

      var newEle = parentA.mate(parentB);
      //crossover
      // var newEle;
      // while (!newEle){
      //  if(random(this.maxFitness) < parentA.fitness){
      //    newEle = parentA;
      //  }
      // }
      //mutate
      newEle.mutate(this.mutationRate);

      //assign new element to array
      newPopulation.push(newEle);
    }
    this.elements = newPopulation;
  }

  this.getParent = function(){
    var i = floor(random(this.elements.length));
    var p = random(0,this.maxFitness);

    if(p < this.elements[i].fitness){
      return this.elements[i];
    }
    //console.log("recursing " + this.elements[i].fitness + " > " + p);
    return this.getParent();
  }
}
