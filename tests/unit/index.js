var mocha  = require('mocha')
,   expect = require('chai').expect;

describe('Main suite', function() {

  it('should have tests', function () {
    expect(true).to.be.true;
  });

  it('should have 2 tests', function () {
    expect(false).to.be.false;
  });

});
