function fork(label,left,right) {
  return function(w) {
    return w(label,left,right);
  }
}

function label(x,l,r){return x;}
function left(x,l,r){return l;}
function right(x,l,r){return r;}

function insert(x,tree) {
  if (tree === null) return fork(x,null,null);
  return fork(Math.min(x,tree(label)),tree(right),insert(Math.max(x,tree(label)),tree(left)));
}

function leaf(x){
    return fork(x, null, null);
}

function make(array){
  if (array.length === 0) return null;
  return array.reduce(function(acc,curr){
    return insert(curr,acc)
  },null)
}

function makeWhitPattern(elements, ops){
	if (elements.length === 0) return null;
	pattern = _.zip(ops, elements);
    return pattern.reduce(function(acc,curr){
	  if(curr[0] === insert) return curr[0](curr[1],acc);
	  return curr[0](acc);
    },null);		
}

function invariant(tree){
	if (tree === null) return true;
	return smaller(tree(label), tree(left)) && smaller(tree(label), tree(right));
}

function smaller(x, tree){
	if (tree === null) return true;
	return (x <= tree(label)) && invariant(tree);
}

function minElem(tree){
	if (tree === null) return null;
	return tree(label);
}

function d(tree){
	return weight(tree(right)) - weight(tree(left));
}

function weight(tree){
	if (tree === null) return 0;
	return 1 + weight(tree(left)) + weight(tree(right));
}

function balanced(tree){
	if (tree === null) return true;
	return ((d(tree) === 0) || (d(tree) === 1)) && balanced(tree(left)) && balanced(tree(right));
}

function deleteMin(tree){
	if (tree === null) return null;
	return merge(tree(left), tree(right));
}

function merge(l, r){
	if ((l === null) && (r === null)) return null;
	if ((l === null)) return r;
	if ((r === null)) return l;
	if(minElem(l) <= minElem(r)) return join(l, r);
	return join(r, l);
}

function join(tree1, tree2){
	return fork(tree1(label), tree1(right), merge(tree1(left), tree2));	
}

function good(tree){
  if(tree === null) return true;
	return (weight(tree(left)) <= weight(tree(right)));
}

function credits(tree){
    if (tree === null) return 0;
    if(good(tree)){
        var h = 0;
    } else {
        var h = 1;
    }
    return credits(tree(left)) + credits(tree(right)) + h;
}

function model(tree){
    return flatten(tree).sort();
}

function flatten(tree){
    if (tree === null) return [];
    return [tree(label)].concat(flatten(tree(left)), flatten(tree(right)));
}








