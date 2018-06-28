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
            text : "",
            age_min: 0,
            age_max: 200,
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
            personTextSearch: this.filters.text,
            personAgeMin: this.filters.age_min,
            personAgeMax: this.filters.age_max
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