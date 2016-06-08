const modules = angular.module('ixtrm.modules', []);
const $inject = ['$q'];
const service = function ($q) {
    const get = resolve => {
        const defer = $q.defer();

        resolve(defer.resolve);
        return defer.promise;
    };

    this.notfound = module => {
        return get(resolve => {
            require.ensure([], () => resolve(module.register(require('./notfound'))));
        });
    };

    this.projects = module => {
        return get(resolve => {
            require.ensure([], () => resolve(module.register(require('./projects'))));
        });
    };

    this.project = module => {
        return get(resolve => {
            require.ensure([], () => resolve(module.register(require('./project'))));
        });
    };

    this.importpatents = module => {
        return get(resolve => {
            require.ensure([], () => resolve(module.register(require('./importpatents'))));
        });
    };

    this.importpatentsresult = module => {
        return get(resolve => {
            require.ensure([], () => resolve(module.register(require('./importpatentsresult'))));
        });
    };

    this.importpatentssave = module => {
        return get(resolve => {
            require.ensure([], () => resolve(module.register(require('./importpatentssave'))));
        });
    };
};

service.$inject = $inject;
modules.service('modules', service);

export default modules.name;
