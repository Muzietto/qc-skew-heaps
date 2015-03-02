var expect = chai.expect;

describe("a skew heap", function () {
  beforeEach(function () {

  });

  describe("sortPerRelative", function (){
    it('return an ordered array of object olding an object and it relative cost', function() {
      var things = [
        {rate: 4, cost: 12},
        {rate: 2, cost: 10},
        {rate: 10, cost: 20}
      ];
      var ref = [
        {rel: 5, obj: 10},
        {rel: 3, obj: 12},
        {rel: 2, obj: 20}
      ];
      bolean = _.isEqual(sortPerRelative(things), ref); 
      expect(bolean).to.be.true);
    }); 
	context('when the tree is null', function(){
        it('returns an empty list', function() {
            expect(model(null)).to.be.eql([]);
        });        
    });
    })  
});

