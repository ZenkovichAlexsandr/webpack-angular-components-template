// Common requires.
require('babel-polyfill');
require('style.less');

const ixtrm = angular.module('ixtrm', [
    require('angular-ui-router'),
    require('app/constants'),
    require('app/modules'),
    require('app/stateservice'),
    require('dynamictitle'),
    require('app/authentication')
]);

ixtrm.config(require('./app/app_router_config')(ixtrm));

const $inject = ['$injector', '$rootScope', 'StateService'];
const run = ($injector, $rootScope, StateService) => {
    ixtrm.register = $injector.loadModule.bind($injector);

    $rootScope.$on('$stateChangeError', function () {
        StateService.goHome();
    });
};

run.$inject = $inject;
ixtrm.run(run);

export default ixtrm;
