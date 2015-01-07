'use strict';

var $ = window.jQuery;

module.exports.getChartContainerSize = function() {

  var $chartContainer = $('.chart__content');

  return {
    height: $chartContainer.innerHeight() * 0.9,
    width: $chartContainer.innerWidth() * 0.9
  };

};
