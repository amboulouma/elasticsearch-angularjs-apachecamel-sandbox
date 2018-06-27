export class PeopleService {
    constructor($http, BACKEND_URL) {
        'ngInject';
       this.$http = $http;
       this.BACKEND_URL = BACKEND_URL;
       }

    createPerson(form) {
        return this.$http({
            method: 'POST',
            url: this.BACKEND_URL + "people/create",
            data: form
        })
    }
}