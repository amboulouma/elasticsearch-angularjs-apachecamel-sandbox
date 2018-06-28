export class PeopleController {
    constructor($http, BACKEND_URL, peopleService) {
        'ngInject';

        this.$http = $http;
        this.BACKEND_URL = BACKEND_URL;
        this.peopleService = peopleService;
        this.formCollapsed = true;
        this.updateFormCollapsed = true;
        this.init();
        this.getPeople();
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
                this.getPeople();
            })
    }


    getPeople() {
        this.peopleService.getPeople();
    }


    prepareUpdate(person) {
        this.updateFormCollapsed = false;
        this.updateForm = person._source;
        this.updatePersonId = person._id;
    }

    updatePerson() {
        this.updateFormCollapsed = true;
        this.peopleService.updatePerson(this.updatePersonId, this.updateForm).then(() => {
            console.log("Person updated");
            this.getPeople();
        })

    }


    deletePerson(id){
        this.peopleService.deletePerson(id).then(() => {
            console.log("Person deleted");
            this.getPeople();
        })
    }
}
