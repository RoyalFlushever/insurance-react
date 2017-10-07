import ClientContact from "./clientContact"

export interface Client {
    id: number,

    isPro: boolean,
    //Pro Specific
    businessName : string,
    siretNumber: string,
    statusId: number,
    businessStatus: any,
    vatNumber: string,
    stdPhone: string,

    //Private Specific
    title: number,
    lastName: string,
    firstName: string,
    email: string,
    phone: string,

    //Common
    relationShipManagerId: number,
    stateId: number,
    address: string,
    addressCompl: string,
    postalCode: string,
    city: string,
    countryId: number
    businessProviderId: number,
    contacts: ClientContact[]
}
export  default Client