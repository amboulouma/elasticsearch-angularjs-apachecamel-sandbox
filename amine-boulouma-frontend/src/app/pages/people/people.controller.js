import {PeopleService} from "../../services/people.service";

export class PeopleController {
    constructor($http, BACKEND_URL, PeopleService) {
        'ngInject';

        this.$http = $http;
        this.BACKEND_URL = BACKEND_URL;
        this.peopleService = PeopleService;
        this.formCollapsed = true;
        this.init();
        this.peopleService.getPeople();
    }


    init() {
        this.form = {
            last_name: "",
            first_name: "",
            age: ""
        };
    }

    createPerson() {
        this.formCollapsed = true;
        this.peopleService.createPerson(this.form)
            .then(() => {
                console.log("Person Created");
                this.init();
                this.peopleService.getPeople();
            })
    }

    deletePerson(id){
        this.peopleService.deletePerson(id).then(() => {
            console.log("Person deleted");
            this.peopleService.getPeople();
        })
    }
}
