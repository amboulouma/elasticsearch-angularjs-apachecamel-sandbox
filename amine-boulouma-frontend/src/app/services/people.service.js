export class PeopleService {
    constructor($http, BACKEND_URL) {
        'ngInject';
        this.$http = $http;
        this.BACKEND_URL = BACKEND_URL;

        this.init();
        this.getPeople();
    }


    init() {
        this.list = [];
        this.filters = {
            text : ""
        }
    }


    createPerson(form) {
        return this.$http({
            method: 'POST',
            url: this.BACKEND_URL + "people/create",
            data: {
                people: form
            }
        })
    }


    getPeople() {
        let headers = {
            personTextSearch: this.filters.text
        };

        this.$http({
            method: 'GET',
            url: this.BACKEND_URL + "people/search",
            params: headers
        }).then(response => {
            this.list = response.data.hits.hits;
            console.log("People Loaded");
        });
    }


    updatePerson(id, updateForm) {
        return this.$http({
            method: 'PUT',
            url: this.BACKEND_URL + "people/update",
            params: {
                personId: id
            },
            data: updateForm
        })
    }


    deletePerson(id) {
        return this.$http({
            method: 'DELETE',
            url: this.BACKEND_URL + "people/delete",
            params: {
                personId: id
            }
        })
    }

}