"use strict";
require('dotenv').config();
const dd = require('./sample_data/performance.json');
const cf = require('./services/codeforcesService');
cf.combineRank([1795, 1788], "Rajshahi University of Engineering and Technology");
