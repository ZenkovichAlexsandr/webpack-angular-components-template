const constants = angular.module('ixtrm.constants', []);

constants
    .constant('States', require('./States'))
    .constant('Endpoints', require('./Endpoints'))
    .constant('UserRoles', require('./UserRoles'));

export default constants.name;
