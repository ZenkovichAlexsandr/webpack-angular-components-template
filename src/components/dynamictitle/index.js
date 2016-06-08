const dynamicTitle = angular.module('dynamicTitle', [
    require('angular-ui-router')
]);

dynamicTitle
    .directive('dynamicTitle', require('./dynamic_title_directive'));

export default dynamicTitle.name;
