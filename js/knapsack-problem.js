var combinations = function(a) {
  var fn = function(n, src, got, all) {
    if (n == 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }
      return;
    }
    for (var j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
    return;
  }
  var all = [];
  for (var i=0; i < a.length; i++) {
    fn(i, a, [], all);
  }
  all.push(a);
  return all;
}

function findCandidate(acc, candidate) {
  if(rate(candidate) > rate(acc) || ((rate(candidate) === rate(acc)) && (cost(candidate) < cost(acc)))){
    return candidate;
  } else{ 
    return acc;
  }
}

function cost(solution) {
  return _.reduce(solution, function(c, t) {return c + t.cost;}, 0);
}

function rate(solution) {
  return _.reduce(solution, function(r, t) {return r + t.rate;}, 0);
}

function knapsackBruteforce(things, budget) {
  var solutions =  combinations(things);
  var validSolutions = _.filter(solutions, function(solution) {return cost(solution) <= budget;});
  return _.reduce(validSolutions, findCandidate, []);
}

function sortPerRelative(things) {
  var sorted = [];
  _.map(things, function(object) {
    sorted.push({rel: object.rate/object.cost, obj: object})
  });
  return sorted.sort(function(a, b) {
    return b.rel - a.rel;
  });
}

function knapsackGreedy(things, budget) {
  var sorted = [];
  var res = [];
  things = things.sort(function(a, b) {
    return b.rate - a.rate;
  })
  sorted = sortPerRelative(things);
  sorted.forEach(function(element, index, array) {
    if(element.obj.cost <= budget){
      res.push(element.obj);
      budget -= element.obj.cost; 
    }
  });
  return res;
}

/*
var things = [
  {rate: 4, cost: 12},
  {rate: 2, cost: 2},
  {rate: 1, cost: 1},
  {rate: 2, cost: 1},
  {rate: 10, cost: 4}
]

console.log(knapsackGreedy(things, 15))
*/