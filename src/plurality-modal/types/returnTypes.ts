export { PluralitySocialConnect } from '../PluralitySocialConnect';


export interface GlobalDataResponse {
    id: string
    eventName: string
}

export interface AllAccounts {
    provider: Provider
    address: string
}

export interface Provider { }

export interface AllAccountsDataType extends GlobalDataResponse {
    data: AllAccounts[]
}

export interface ConnectedAccountDataType extends GlobalDataResponse {
    data: AllAccounts
}

export interface SignMessageDataType extends GlobalDataResponse {
    data: string
}

export interface VerifySignedMessageDataType extends GlobalDataResponse {
    data: string
}

export interface GetBalanceDataType extends GlobalDataResponse {
    data: string
}

export interface SendTransactionDataType extends GlobalDataResponse {
    data: string
}

export interface GetBlockNumberDataType extends GlobalDataResponse {
    data: number
}

export interface GetTransactionCountDataType extends GlobalDataResponse {
    data: number
}

export interface ReadFromContractDataType extends GlobalDataResponse {
    data: string
}

export interface WriteToContractDataType extends GlobalDataResponse {
    data: string
}
export interface SwitchNetworkDataType extends GlobalDataResponse {
    data: string
}




