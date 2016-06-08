const $inject = ['$rootScope'];
const DynamicTitle = $rootScope => {
    return {
        restrict: 'A',
        link(scope, element) {
            const chageTitile = function (event, toState) {
                const getTitle = function (title) {
                    if (title) {
                        return `idealAssets | ${title}`;
                    }
                    return 'idealAssets';
                };

                element.text(getTitle(toState.stateTitle));
            };

            const handler = $rootScope.$on('$stateChangeSuccess', chageTitile);

            $rootScope.$on('$destroy', function () {
                handler();
            });
        }
    };
};

DynamicTitle.$inject = $inject;

export default DynamicTitle;
