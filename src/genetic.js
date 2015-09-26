Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

var Gene = function(code) {
    if (code) this.code = code;
    this.cost = 9999;
};
Gene.prototype.code = '';
Gene.prototype.random = function(length) {
  genome = {
    "wheels" : {
      "left": 10,
      "right": 10
    },

    "axis": [{
      "alpha" : 20,
      "length": 2,
      },
      {
        "alpha" : 10,
        "length": 3,
      }
    ]
  }

  this.code = genome
};
Gene.prototype.mutate = function(chance) {
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
Gene.prototype.mate = function(gene) {
    var pivot = Math.round(this.code.length / 2) - 1;

    var child = clone(this.code)
    child.wheels.left = (this.code.wheels.left + gene.code.wheels.left)/2;
    child.wheels.right = (this.code.wheels.right + gene.code.wheels.right)/2;
    child.axis.forEach((function (axe, index){
        axe.length = this.code.axis[index].length + gene.code.axis[index].length;
        axe.alpha = this.code.axis[index].alpha + gene.code.axis[index].alpha;
    }).bind(this))
    return [new Gene(child)];
};
Gene.prototype.calcCost = function(compareTo) {
    var total = 0;
        total += this.code.wheels.right - compareTo.wheels.right
        total += this.code.wheels.left - compareTo.wheels.left
        this.code.axis.forEach(function (axe, index){
            total += axe.length - compareTo.axis[index].length
            total += axe.alpha - compareTo.axis[index].alpha
        })

    this.cost = total;
};

var Cars = function(goal, size) {
    this.members = [];
    this.goal = goal;
    this.generationNumber = 0;
    while (size--) {
        var gene = new Gene();
        gene.random(this.goal.length);
        this.members.push(gene);
    }
};
Cars.prototype.display = function() {
    document.body.innerHTML = '';
    document.body.innerHTML += ("<h2>Generation: " + this.generationNumber + "</h2>");
    document.body.innerHTML += ("<ul>");
    for (var i = 0; i < this.members.length; i++) {
        document.body.innerHTML += ("<li>" + JSON.stringify(this.members[i].code) + " (" + this.members[i].cost + ")");
    }
    document.body.innerHTML += ("</ul>");
};
Cars.prototype.sort = function() {
    this.members.sort(function(a, b) {
        return a.cost - b.cost;
    });
}
Cars.prototype.generation = function() {
    for (var i = 0; i < this.members.length; i++) {
        this.members[i].calcCost(this.goal);

    }

    this.sort();
    this.display();
    var children = this.members[0].mate(this.members[1]);
    this.members.splice(this.members.length -2, 2, children[0], children[0]);

    for (var i = 0; i < this.members.length; i++) {
        this.members[i].mutate(0.1);
        this.members[i].calcCost(this.goal);
        if (this.members[i].cost > 0 && this.members[i].cost < 1 ) {
            this.sort();
            this.display();
            return true;
        }
    }
    this.generationNumber++;
    var scope = this;
    setTimeout(function() {
        scope.generation();
    }, 20);
};
genome = {
  "wheels" : {
    "left": 10,
    "right": 10
  },

  "axis": [{
    "alpha" : 30,
    "length": 2,
    },
    {
      "alpha" : 30,
      "length": 3,
    }
  ]

}

var Cars = new Cars(genome, 20);
Cars.generation();
