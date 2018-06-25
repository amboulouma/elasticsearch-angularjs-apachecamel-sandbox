export function routerConfig($routeProvider) {
    'ngInject';

    $routeProvider
    .when("/", {
        templateUrl: 'app/pages/people/people.html'
    });
}
