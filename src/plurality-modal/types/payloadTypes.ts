export interface BasePayload {
    id: string;
    type: string;
    method: string;
    isWidgetOpen: string
}

export interface MessagePayload extends BasePayload {
    message: string;
}

export interface DataPayload extends BasePayload {
    key: string;
    value: string;
}

export interface ReceiverPayload extends BasePayload {
    sendTo: string;
}

export interface RawTransactionPayload extends BasePayload {
    raw_transaction: string;
}

export interface AmountPayload extends BasePayload {
    amount: string;
}

export interface AddressPayload extends BasePayload {
    address: string;
}

export interface MessageSignaturePayload extends MessagePayload {
    signature: string;
}

export interface AbiPayload extends MessagePayload {
    abi: string;
}

export interface MethodNamePayload extends MessagePayload {
    method_name: string;
}

export interface MethodNamePayload extends MessagePayload {
    method_name: string;
}

export interface MethodParamsPayload extends MessagePayload {
    method_params: any;
}

export interface RpcPayload extends MessagePayload {
    rpc: string;
}

export interface ChainIdPayload extends MessagePayload {
    chain_id: string;
}

export interface TxOptionsPayload extends MessagePayload {
    options: string
}

export type Payload = BasePayload | MessagePayload | MessageSignaturePayload;

interface Scores {
    scoreType: string
    scoreValue: number
}
export interface User {
    username?: string;
    user?: string;
    name?: string;
    avatar?: string;
    profileIcon?: string;
    ratings?: number;
    rating?: number;
    scores: Scores[]
    consent: boolean
}
