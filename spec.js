require('babel-polyfill');
require('./ventodor/angular.src');
require('angular-mocks');

const testsContext = require.context('./src', true, /_spec\.js$/);

testsContext.keys().forEach(testsContext);
