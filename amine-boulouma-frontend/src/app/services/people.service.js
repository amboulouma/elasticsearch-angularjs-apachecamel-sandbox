export class PeopleService {
    constructor($http, BACKEND_URL) {
        'ngInject';
       this.$http = $http;
       this.BACKEND_URL = BACKEND_URL;
       this.list = [];
       this.getPeople();
       }


    createPerson(form) {
        return this.$http({
            method: 'POST',
            url: this.BACKEND_URL + "people/create",
            data: form
        })
    }


    getPeople() {
        return this.$http({
            method: 'GET',
            url: this.BACKEND_URL + "people/search",
        }).then(response => {
            this.list = response.data.hits.hits;
        });

    }
}