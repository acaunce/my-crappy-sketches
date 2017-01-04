function Population(target, count, mr){
  this.elements = [];
  this.length = count;
  this.maxFitness = 0;
  this.target = target;
  this.bestGuess = "";
  this.mutationRate = mr;

  for(var i = 0; i< count; i++){
    this.elements[i] = new Element(target.length);
  }

  this.calcFitness = function(){
    this.maxFitness = 0;
    for (var i = 0; i< this.elements.length;i++){
      this.elements[i].setFitness(this.target);
      if(this.elements[i].fitness > this.maxFitness){
        this.maxFitness = this.elements[i].fitness;
      }
    }
  }

  this.eval = function(){
    var recordFitness = 0;
    var bestGuess = "";
    for(var i = 0; i < count; i++){
      if(this.elements[i].fitness > recordFitness){
        recordFitness = this.elements[i].fitness;
        bestGuess = this.elements[i].value;
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
      //crossover
      var newEle = parentA.mate(parentB);
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
