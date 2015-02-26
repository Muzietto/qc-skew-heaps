
function fork(label,left,right) {
  return function(w) {
    return w(label,left,right);
  }
}

function label(x,l,r){return x;}
function left(x,l,r){return l;}
function right(x,l,r){return r;}

function insert(x,tree) {
  if (tree === null) return fork(x,null,null)
  return fork(Math.min(x,tree(label)),tree(right),insert(Math.max(x,tree(label)),tree(left)))
}

function make(array){
  if (array.length === 0) return null;
  return array.reduce(function(acc,curr){
    return insert(curr,acc)
  },null)
}

