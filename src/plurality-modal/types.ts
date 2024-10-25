export interface BasePayload {
    id: string;
    type: string;
    method: string;
}

export interface MessagePayload extends BasePayload {
    message: string;
}

export interface ReceiverPayload extends BasePayload {
    sendTo: string;
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
    method_params: string;
}

export type Payload = BasePayload | MessagePayload | MessageSignaturePayload;