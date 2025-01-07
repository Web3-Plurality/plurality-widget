import type { AllAccounts, AllAccountsDataType, ConnectedAccountDataType, GetBalanceDataType, GetBlockNumberDataType, GetTransactionCountDataType, GlobalDataResponse, Provider, ReadFromContractDataType, SendTransactionDataType, SignMessageDataType, SwitchNetworkDataType, VerifySignedMessageDataType, WriteToContractDataType } from './types/returnTypes';

// Export the component
export { default } from './PluralitySocialConnect';

// Export all interfaces
export type {
    GlobalDataResponse,
    AllAccounts,
    Provider,
    AllAccountsDataType,
    ConnectedAccountDataType,
    SignMessageDataType,
    VerifySignedMessageDataType,
    GetBalanceDataType,
    SendTransactionDataType,
    GetBlockNumberDataType,
    GetTransactionCountDataType,
    ReadFromContractDataType,
    WriteToContractDataType,
    SwitchNetworkDataType
};
