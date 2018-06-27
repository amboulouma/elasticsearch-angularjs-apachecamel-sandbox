export function routerConfig($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider
        .state('people', {
            url: '/people',
            templateUrl: 'app/pages/people/people.html',
            controller: 'PeopleController',
            controllerAs: 'peopleController'
        });

    $urlRouterProvider
        .otherwise("/people");

}
