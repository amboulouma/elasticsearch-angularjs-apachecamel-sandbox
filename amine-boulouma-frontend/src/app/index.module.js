
import {routerConfig} from './index.route';
import {runBlock} from './index.run';

import {PeopleCtrl} from './pages/people/people.controller';
import {NavbarCtrl} from './partials/navbar/navbar.controller';

import {PersonService} from './services/services.person';

console.log(PeopleCtrl);

angular.module(
    'amine-boulouma-sandbox',
    [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'angulartics',
        'ngResource',
        'ngRoute',
        'ui.bootstrap',
        'ui.date',
        'ui.router',
        'ui.select',
        'ui.swiper',
        'ng.deviceDetector'
    ])

    .controller('PeopleCtrl', PeopleCtrl)
    .controller('NavbarCtrl', NavbarCtrl)

    .service('PersonSrv', PersonService)

    .config(routerConfig)
    .run(runBlock)
;

console.log("Index module loaded");