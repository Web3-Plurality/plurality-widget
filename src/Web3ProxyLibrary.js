import { parseEther } from 'ethers';

const iframeUrl= "http://localhost:3000";    

export const getConnectedAccount = async () => {
    const iframe = document.getElementById('iframe');
    // Send MetaMask-related request to the iframe
    iframe.contentWindow.postMessage({ type: 'metamaskRequest', method: 'getConnectedAccount' }, iframeUrl);
}

export const getMessageSignature = async (messageToSign) => {
    const iframe = document.getElementById('iframe');
    // Send MetaMask-related request to the iframe
    console.log(messageToSign);
    iframe.contentWindow.postMessage({ type: 'metamaskRequest', method: 'getMessageSignature', message: messageToSign.toString() }, iframeUrl);
}

export const getBalance = async () => {
    const iframe = document.getElementById('iframe');
    // Send MetaMask-related request to the iframe
    iframe.contentWindow.postMessage({ type: 'metamaskRequest', method: 'getBalance'}, iframeUrl);
}

export const sendTransaction = async (addressToSend, valueToSend) => {
    const iframe = document.getElementById('iframe');
    // Send MetaMask-related request to the iframe
    console.log(addressToSend, valueToSend);
    iframe.contentWindow.postMessage({ type: 'metamaskRequest', method: 'sendTransaction', sendTo: addressToSend.toString(), value: parseEther(valueToSend.toString())}, iframeUrl);
}