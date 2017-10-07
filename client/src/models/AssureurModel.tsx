import {ValidationService} from "../services/validation";

export interface IAssureur {
    status : string
    businessName : string
    rate : string
    siret : string
    brokerId : string
    address : string
    zipCode : string
    city : string
    country : string
    addressAccounting : string
    zipCodeAccounting : string
    cityAccounting : string
    countryAccounting : string
    legalNotice : string
    contacts : any[]
}

export class Assureur{

    public status
    public businessName
    public rate
    public siret
    public brokerId
    public address
    public zipCode
    public city
    public country
    public addressAccounting
    public zipCodeAccounting
    public cityAccounting
    public countryAccounting
    public legalNotice
    public contacts

    constructor(){
        this.hydrate({});
    }

    hydrate(object){
        this.status = object.status === false ? false : true;
        this.businessName = object.businessName || '';
        this.rate = object.rate || 0;
        this.siret = object.siret || '';
        this.brokerId = object.brokerId || '';
        this.address = object.address || '';
        this.zipCode = object.zipCode || '';
        this.city = object.city || '';
        this.country = object.country || '';
        this.addressAccounting = object.addressAccounting || '';
        this.zipCodeAccounting = object.zipCodeAccounting || '';
        this.cityAccounting = object.cityAccounting || '';
        this.countryAccounting = object.countryAccounting || '';
        this.legalNotice = object.legalNotice || '';
        this.contacts = object.contacts ? object.contacts  : [];
    }

    validationFn(attributName, value){
        switch (attributName){
            case "businessName":
                return !!value;
            case "siret":
                return ValidationService.validationSiret(value);
            default:
                return true;
        }
    }

    validateObject(){
        var res =  this.validationFn("businessName", this.businessName) && this.validationFn("siret", this.siret);
        return res;
    }

}