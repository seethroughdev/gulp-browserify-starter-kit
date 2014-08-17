(function(expect, $) {

  'use strict';


  describe('Functional Test Suite', function() {

    it('Should run tests', function () {

      expect(true).to.be.true;

    });

    it('should read elements on the page', function () {

      expect($('#testElement')).to.have.class('is-active');

    });

  });

}(window.chai.expect, window.jQuery));
