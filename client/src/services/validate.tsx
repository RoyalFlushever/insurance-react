import {isUndefined} from "util";
import i18next from 'i18next';
import {isNullOrUndefined} from "util";

export class Validate {

    static validate = (rules) => {
        let result = {};
        for (let key in rules){
            let validations = rules[key]
            if (!Array.isArray(validations)){
                validations = [validations]
            }
            let errors = [];
            for (let index in validations){
                let validation = validations[index]
                let test = validation.call()
                if (test){
                    errors.push(test)
                }
            }
            result[key] = {
                valid: errors.length == 0,
                errors: errors
            };
        }
        return result
    }

    static required = (value, message?) => {
        if (value != "" && value != null && !isUndefined(value)){
            return message ? message : i18next.t("common:valid-required")
        }
        else return null;
    }

    static requiredIf = (condition, value, message?) => {
        if (condition && (value == "" || value == null || isUndefined(value))){
            return message ? message : i18next.t("common:valid-required")
        }
        else return null;
    }

    static siret = (value, message?) => {
        if (isNullOrUndefined(value)){
            return null;
        }
        let siret = value.replace(/\s+/g, '')
        let valid = true;
        if (isNaN(parseInt(siret)) || siret.length != 14)
            valid = false;
        let sum: number = 0;
        let tmp: number;
        for (let cpt = 0; cpt < siret.length; cpt++) {
            if ((cpt % 2) == 0) {
                tmp = parseInt(siret.charAt(cpt)) * 2;
                if (tmp > 9)
                    tmp -= 9;
            }
            else
                tmp = parseInt(siret.charAt(cpt));
            sum += tmp;
        }
        if ((sum % 10) != 0)
            valid = false;

        if (!valid){
            return message ? message : i18next.t("common:valid-siret");
        }
        return null;
    }

    static email = (value, message?) => {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(value)) return null;
        return message ? message : i18next.t("common:valid-email");
    }

}

export default Validate