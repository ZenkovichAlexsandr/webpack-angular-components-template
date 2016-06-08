export default ixtrm => {
    const route = (entry, stateTitle, url) => ({
        url: `/${url}`,
        stateTitle,
        template: `<${entry}></${entry}>`,
        resolve: {
            async: ['modules', modules => modules[entry](ixtrm)]
        }
    });

    const $inject = ['$urlRouterProvider', '$stateProvider', 'States'];
    const RouterConfig = function ($urlRouterProvider, $stateProvider, States) {
        $urlRouterProvider
            .when('', '/')
            .when('/', '/projects')
            .otherwise('/notfound');

        $stateProvider
            .state(States.NOT_FOUND, route('notfound', 'Not Found', 'notfound'))
            .state(States.PROJECTS, route('projects', 'Projects', 'projects'))
            .state(States.PROJECT, route('project', 'Project Details', 'project/details/:projectId'))
            .state(States.IMPORT_PATENTS, route('importpatents', 'Import Patents', 'project/:projectId/import/patents'))
            .state(States.IMPORT_PATENTS_RESULT, route('importpatentsresult', 'Import Patents Result',
                'project/:projectId/import/patents/result/:data'))
            .state(States.IMPORT_PATENTS_SAVE, route('importpatentssave', 'Import Patents Save',
                'project/:projectId/import/patents/save/:data'));
    };

    RouterConfig.$inject = $inject;
    return RouterConfig;
};
