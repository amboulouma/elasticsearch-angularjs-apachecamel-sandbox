export class PeopleController {
    constructor($http, BACKEND_URL, peopleService) {
        'ngInject';

        this.$http = $http;
        this.BACKEND_URL = BACKEND_URL;
        this.peopleService = peopleService;

        this.formCollapsed = true;
        this.form;

        this.getPeople();
    }


    createPerson() {
        this.peopleService.createPerson(this.form).then(() => {
            alert("Success");
            this.getPeople();
        })
    }


    getPeople() {
        this.peopleService.getPeople().then(() => {
            console.log("People loaded");
        })
    }
}
