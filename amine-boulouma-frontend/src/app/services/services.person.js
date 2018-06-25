export class PersonService {
    constructor($http, $timeout) {
       this.VERSION = "1.0.0";
       console.log("PersonService loaded");
       this.content = {};
       this.http = $http;

       this.load("jgc");
    }

    load(id) {
        var srv = this;

        this.http({
            method: 'GET',
            url: 'http://localhost:8181/api/v1/person/'+id
        }).then(function (response) {
            console.log(response);
            srv.content.person = response.data.person;
         });
    }
}