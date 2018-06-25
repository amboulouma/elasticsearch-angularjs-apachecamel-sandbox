export class PeopleCtrl {
    constructor(PersonSrv) {
        'ngInject';
        console.log("Using PersonService version "+ PersonSrv.VERSION);
        this.content = PersonSrv.content;
        console.log("People loaded");
    }
}
