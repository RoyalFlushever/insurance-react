import {ValidationService} from "../services/validation";

export interface IUser {
    businessName : string

}

export default class User{

    public id;
    public genre;
    public firstName;
    public lastName;
    public address;
    public address2;
    public zipcode;
    public email;
    public phone;
    public mobile;
    public isDeleted;

    constructor(){
        this.hydrate({})
    }

    hydrate(object){
        this.id = object.id || null;
        this.genre = object.genre || "";
        this.firstName = object.firstName || '';
        this.lastName = object.lastName || '';
        this.address = object.address || '';
        this.address2 = object.address2 || '';
        this.zipcode = object.zipcode || '';
        this.email = object.email || '';
        this.email = object.email || '';
        this.mobile = object.mobile || '';
        this.isDeleted = false;
    }

    validationFn(attributName, value){
        switch (attributName){
            case "email":
                return ValidationService.validationEmail(value);
            default:
                return true;
        }
    }
    setDeleted(){
        this.isDeleted = true;
    }

    validateObject(){
        var res = true;
        return res;
    }

}