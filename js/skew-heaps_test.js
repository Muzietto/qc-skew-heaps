
var expect = chai.expect;

describe("a skew heap", function () {
  beforeEach(function () {

  });

  describe("built by the make method", function () {

    it('may be null (empty)', function () {
      var arr = [];
      var res = make(arr);
      expect(res).to.be.null;
    });

    it('may have one node with empty branches', function () {
      var arr = [12];
      var res = make(arr);
      expect(res(label)).to.be.equal(12);
      expect(res(left)).to.be.null;
      expect(res(right)).to.be.null;
    });
    
    it('may have two nodes', function () {
      var arr = [24,12];
      var res = make(arr);
      expect(res(left)).to.be.null;
      expect(res(right)).to.be.not.null;
    });
  })
  
  describe("through careful insertions", function () {

    it('may have two nodes and be ordered', function () {
      var arr = [24,12];
      var res = make(arr);
      expect(res(label)).to.be.equal(12);
      expect(res(right)(label)).to.be.equal(24);
    });
    
  })
  
  describe("returning is minimum element", function () {

    it('that is null if the tree is empty', function () {
      var arr = [];
      var res = make(arr);
      expect(minElem(res)).to.be.null;
    });
	
	it('that is the minimum element if the tree is not empty', function () {
      var arr = [36, 48, 56, 12];
      var res = make(arr);
      expect(minElem(res)).to.be.equal(12);
    });
    
  })
  
  describe("return is weight", function (){
	  
	it('that is 0 if the tree is empty', function() {
	  var arr = [];
	  var res = make(arr);
	  expect(weight(res)).to.be.equal(0);
	});
	
	it('that is equal to the number of element in the tree', function() {
		var arr = [59, 21, 23, 26];
		var res = make(arr);
		expect(weight(res)).to.be.equal(4);
	});	  
	  
  })
  
  describe("has to be balanced", function (){
	  
	it('if is empty', function() {
	  var arr = [];
	  var res = make(arr);
	  expect(balanced(res)).to.be.true;
	});
	
	it('of populated', function() {
	  var arr = [59, 21, 23, 26];
	  var res = make(arr);
	  expect(balanced(res)).to.be.true;
	});	  
	  
  })  
  
  describe("built whit makeWhitPattern", function (){
	  
	it('if is empty', function() {
	  var arr1 = [];
	  var arr2 = [];
	  var res = makeWhitPattern(arr1, arr2);
	  expect(res).to.be.null;
	});
	
	it('of populated', function() {
	  var arr1 = [59, 21, 23, 21];
	  var arr2 = [insert, insert, insert, deleteMin];
	  var res = makeWhitPattern(arr1, arr2);
	  expect(balanced(res)).to.be.true;
	});	  
	  
  })  
});

JSC.on_report(function(str){console.log(str);});

function test_invariant(verdict, arr){
	return verdict(invariant(make(arr)));
}

function test_balanced(verdict, arr){
	return verdict(balanced(make(arr)));
}

JSC.claim('testing invariant', test_invariant, [JSC.array(JSC.integer(100), JSC.integer())]);
JSC.claim('testing balanced', test_balanced, [JSC.array(JSC.integer(100), JSC.integer())]);

function test_invariant_whit_deletion(verdict, elements, ops){
	return verdict(invariant(makeWhitPattern(elements, ops)));
}

function test_balanced_whit_deletion(verdict, elements, ops){
	return verdict(balanced(makeWhitPattern(elements, ops)));
}

JSC.claim('testing invariant whit deletion', test_invariant_whit_deletion, 
	[JSC.array(100, JSC.integer()), JSC.array(100, JSC.one_of([JSC.literal(insert), JSC.literal(deleteMin)]))]);
//JSC.claim('testing balanced whit deletion', test_balanced_whit_deletion, 
//	[JSC.array(100, JSC.integer()), JSC.array(100, JSC.one_of([JSC.literal(insert), JSC.literal(deleteMin)]))]);

function test_good_whit_deletion(verdict, elements, ops){
	return verdict(good(makeWhitPattern(elements, ops)));
}

//JSC.claim('testing good whit deletion', test_good_whit_deletion, 
//	[JSC.array(100, JSC.integer()), JSC.array(100, JSC.one_of([JSC.literal(insert), JSC.literal(deleteMin)]))]);

JSC.reps(1000);
JSC.check(1000);