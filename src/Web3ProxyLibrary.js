import { parseEther } from 'ethers';

//for local development
//const iframeUrl = "http://localhost:3000";

//for prod development
const iframeUrl = "https://app.plurality.network";

export const getAllAccounts = async () => {
    const iframe = document.getElementById('iframe');
    // Send MetaMask-related request to the iframe
    iframe.contentWindow.postMessage({ type: 'metamaskRequest', method: 'getAllAccounts' }, iframeUrl);
}

export const getConnectedAccount = async () => {
    const iframe = document.getElementById('iframe');
    // Send MetaMask-related request to the iframe
    iframe.contentWindow.postMessage({ type: 'metamaskRequest', method: 'getConnectedAccount' }, iframeUrl);
}

export const getMessageSignature = async (messageToSign) => {
    const iframe = document.getElementById('iframe');
    // Send MetaMask-related request to the iframe
    iframe.contentWindow.postMessage({ type: 'metamaskRequest', method: 'getMessageSignature', message: messageToSign.toString() }, iframeUrl);
}

export const verifyMessageSignature = async (plainMessage, signedMessage) => {
    const iframe = document.getElementById('iframe');
    // Send MetaMask-related request to the iframe
    iframe.contentWindow.postMessage({ type: 'metamaskRequest', method: 'verifyMessageSignature', message: plainMessage.toString(), signature: signedMessage.toString() }, iframeUrl);
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

export const getBlockNumber = async () => {
    const iframe = document.getElementById('iframe');
    // Send MetaMask-related request to the iframe
    iframe.contentWindow.postMessage({ type: 'metamaskRequest', method: 'getBlockNumber'}, iframeUrl);
}
export const getTransactionCount = async (addr) => {
    const iframe = document.getElementById('iframe');
    // Send MetaMask-related request to the iframe
    iframe.contentWindow.postMessage({ type: 'metamaskRequest', method: 'getTransactionCount', address: addr}, iframeUrl);
}

export const readFromContract = async (addr, abi, method_name, method_params) => {
    const iframe = document.getElementById('iframe');
    // Send MetaMask-related request to the iframe
    iframe.contentWindow.postMessage({ type: 'metamaskRequest', 
                                       method: 'readFromContract', 
                                       contractAddress: addr,
                                       abi: abi,
                                       methodName: method_name,
                                       methodParams: method_params}, 
                                        iframeUrl);
}

export const writeToContract = async (addr, abi, method_name, method_params) => {
    const iframe = document.getElementById('iframe');
    // Send MetaMask-related request to the iframe
    iframe.contentWindow.postMessage({ type: 'metamaskRequest', 
                                       method: 'writeToContract', 
                                       contractAddress: addr,
                                       abi: abi,
                                       methodName: method_name,
                                       methodParams: method_params}, 
                                       iframeUrl);
}