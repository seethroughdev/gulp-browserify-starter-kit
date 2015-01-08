'use strict';

/**
 * Add default options for charts here.
 * Keeping them in a manifest file to make it easier to manage
 */

var RevenueOpts = require('./revenue-chart-opts'),
    ChurnOpts   = require('./churn-chart-opts'),
    ChartOpts;

ChartOpts = {
  revenue: {
    summary: RevenueOpts.summary,
    plans: RevenueOpts.plans,
    mix: RevenueOpts.mix,
    location: RevenueOpts.location
  },
  churn: {
    summary: ChurnOpts.summary,
    revenue: ChurnOpts.revenue,
    monthly: ChurnOpts.monthly,
    annual: ChurnOpts.annual
  }
};

module.exports = ChartOpts;
