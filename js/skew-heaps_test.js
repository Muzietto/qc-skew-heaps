
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
});

