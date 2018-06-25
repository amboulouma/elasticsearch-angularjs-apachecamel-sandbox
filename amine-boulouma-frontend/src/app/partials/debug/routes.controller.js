export class RoutesCtrl {
    constructor($stateParams, $state, $location, $route, $routeParams) {
        'ngInject';

        this.$location = $location;
        this.$route = $route;
        this.$routeParams = $routeParams;
    }
}
