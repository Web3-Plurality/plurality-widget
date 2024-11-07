import {
    AbiPayload,
    AddressPayload,
    AmountPayload,
    MessagePayload,
    MessageSignaturePayload,
    MethodNamePayload,
    MethodParamsPayload,
    Payload,
    ReceiverPayload
} from "./types";

const baseUrl = process.env.REACT_APP_WIDGET_BASE_URL || '*'

class PluralityApi {
    static sendRequest = (eventName: string, ...args: string[]) => {
        const isOpen = localStorage.getItem('isOpen')
        return new Promise((resolve, reject) => {
            // Create a unique message ID to identify the response
            const messageId = `msg-${Date.now()}`;

            // Set up the message listener
            function messageListener(event: MessageEvent) {
                if ((event.data.eventName === eventName || event.data.eventName === 'errorMessage') && event.data.id === messageId) {
                    resolve(event.data);
                    window.removeEventListener('message', messageListener);
                } else if (event.data.eventName === 'noEthersProvider' && event.data.id === messageId) {
                    alert(`${event.data}`)
                }

            }

            console.log("registering event listener for");
            console.log(messageId);
            window.addEventListener('message', messageListener);

            const iframe = document.getElementById('iframe') as HTMLIFrameElement;
            if (iframe?.contentWindow) {
                const payload: Payload = { id: messageId, type: 'metamaskRequest', method: eventName, isWidgetOpen: isOpen || 'false' };

                if (args.length > 0) {
                    if (eventName === 'sendTransaction') (payload as ReceiverPayload).sendTo = args[0];
                    else if (eventName === 'getTransactionCount') (payload as AddressPayload).address = args[0]
                    else (payload as MessagePayload).message = args[0];
                }
                if (args.length > 1) {
                    if (eventName === 'sendTransaction') (payload as AmountPayload).amount = args[1];
                    else (payload as MessageSignaturePayload).signature = args[1];
                }
                if (args.length > 2) {
                    (payload as AddressPayload).address = args[0];
                    (payload as AbiPayload).abi = args[1];
                    (payload as MethodNamePayload).method_name = args[2];
                    (payload as MethodParamsPayload).method_params = args[3];
                }

                iframe.contentWindow.postMessage(payload, baseUrl);
            } else {
                window.removeEventListener('message', messageListener);
                reject(new Error('Iframe not found or iframe content window is not accessible'));
            }
        });
    }
}


export default PluralityApi