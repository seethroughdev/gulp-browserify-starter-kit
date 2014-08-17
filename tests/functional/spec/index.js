'use strict';

var expect = window.chai.expect;

var $ = window.jQuery;

describe('Main Test Suite', function() {

  it('Should run tests', function () {

    expect(true).to.be.true;

  });

  it('should read elements on the page', function () {

    expect($('#testElement')).to.have.class('is-active');

  });

});
