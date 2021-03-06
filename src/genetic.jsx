function rnd(min, max) {
  return min + (Math.random() * (max - min))
}

function randomVehicle() {
  return {
    wheels: {
      left: rnd(20, 50),
      right: rnd(20, 50),
    },
    axis: [0, 1, 2, 3, 4, 5, 6, 7]
      .map(() => ({
        alpha: rnd(0, 360),
        length: rnd(50, 100),
      }))
      .sort((a, b) => a.alpha - b.alpha),
  }
}

function clone(obj) {
    var copy;
    if (null == obj || "object" != typeof obj) return obj;
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
}

class Gene  {
  constructor(code) {
    if (code) this.code = code;
    this.cost = 9999;
    this.code = {};
  }
  random(length) {
    this.code = randomVehicle()
  };
  mutate (chance) {
      if (Math.random() > chance) return;

      this.code.axis.forEach(function (axe){
          if(Math.random() % 2)
          {
          axe.length += chance;
          axe.alpha += chance;

          }
          else
          {
          axe.length -= chance;
          axe.alpha -= chance;

          }
      })


  };
  mate(gene) {

      var pivot = Math.round(this.code.length / 2) - 1;
      var child = clone(this.code)
      child.wheels.left = (this.code.wheels.left + gene.code.wheels.left)/2;
      child.wheels.right = (this.code.wheels.right + gene.code.wheels.right)/2;
      child.axis.forEach((function (axe, index){
          axe.length = this.code.axis[index].length + gene.code.axis[index].length;
          axe.alpha = this.code.axis[index].alpha + gene.code.axis[index].alpha;
      }).bind(this))
      return new Gene(child);
  };
  calcCost(compareTo) {
      var total = 0;
          total += this.code.wheels.right - compareTo.wheels.right
          total += this.code.wheels.left - compareTo.wheels.left
          this.code.axis.forEach(function (axe, index){
              total += axe.length - compareTo.axis[index].length
              total += axe.alpha - compareTo.axis[index].alpha
          })

      this.cost = total;
  };


};
export class Cars {
  constructor(size) {
    this.members = [];
    this.generationNumber = 0;
    while (size--) {
        var gene = new Gene();
        gene.random();
        this.members.push(gene);
    }
  }
  generation() {
      for (var i = 0; i < this.members.length; i++) {
          if(i != this.winner)
            this.members[i].mutate(0.1);

      }
      if(this.winner != undefined)
      {
        var children = this.members[this.winner].mate(this.members[this.winner]);
        this.members.splice(this.members.length -2, 2, children, children);
      }
      this.generationNumber++;
  };
}
