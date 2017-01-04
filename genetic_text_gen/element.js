function Element(len, str){
  this.fitness = 0;

  if (str) {
    this.value = str;
  }
  else {
    this.value = getRandomString(len);
  }

  this.setFitness = function(target){
    var fitnessVal = 0;
    for(var i = 0; i<this.value.length;i++){
      if(this.value.charAt(i) === target.charAt(i)){
        fitnessVal ++;
      }
    }
    this.fitness = pow(2, fitnessVal) / len + 0.01;
  }

  this.mate = function(parent){
    var index = floor(random(this.value.length));

    var firstHalf = this.value.slice(0, index);
    var lastHalf = parent.value.slice(index, len);

    return new Element(len, firstHalf + lastHalf);
  }

  this.mutate = function(rate){

    for(var i = 0; i< this.value.length; i++){
      if(random(1) < rate){
        this.value = this.value.replaceAt(i, getRandomString(1));
      }
    }
  }

}


function getRandomString(len){
  var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";

    for( var i=0; i < len; i++ )
        text += possible.charAt(Math.floor(random(possible.length)));

    return text;
}
