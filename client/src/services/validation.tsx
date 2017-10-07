export class ValidationService {

    /***
     * This function accept SIRET and SIREN
     * @param siret
     * @returns {boolean}
     */
    static validationSiret(siret: string) {
        siret = siret.replace(/\s+/g, '');
        if (isNaN(parseInt(siret)))
            return false;
        if (siret.length && siret.length < 5 || siret.length > 14)
            return false;
        return true;
    }

    /***
     * This function return true if not empty
     * @param s
     * @returns {boolean}
     */
    static validationNotEmpty(s: string) {
        return !!s;
    }

    /***
     * This function return true if not empty
     * @param s
     * @returns {boolean}
     */
    static validationEmail(s: string) {
        return  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(s);
    }
}