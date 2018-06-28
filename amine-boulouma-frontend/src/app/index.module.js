
import {routerConfig} from './index.route';
import {runBlock} from './index.run';

import { PeopleController } from "./pages/people/people.controller";
import {NavbarCtrl} from './partials/navbar/navbar.controller';

import {PeopleService} from './services/people.service';

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

    .controller('PeopleController', PeopleController)
    .controller('NavbarCtrl', NavbarCtrl)

    .service('PeopleService', PeopleService)

    .constant('BACKEND_URL', "http://localhost:8181/api/v1/")

    .config(routerConfig)
    .run(runBlock)
;

console.log("Index module loaded");