import React, { Component, useEffect } from 'react';
import './buttonStyle.css'
import PluralityModal from './PluralityModal';

import { ethers } from 'ethers';
import { isDisabled } from '@testing-library/user-event/dist/utils';


//for local development
 //const baseUrl = "http://localhost:3000";
 //const baseUrl = "https://beta.plurality.network";

//for prod development
const baseUrl = "https://app.plurality.network";


let frameUrl;
let eventListenerAttached = false;
let shouldDisableButton = false;

class PluralitySocialConnect extends Component {

    constructor(props) {
        super(props);

        this.state = {
            iframeStyle: {
                width: 0,
                height: 0,
                border: 'none',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
            },
            isOpen: false,
            isDisabled: false,
        };
        // Attach event listener only once, outside of this function
        if (!eventListenerAttached) {
            window.addEventListener('message', (event) => {  
                const { eventName } = event.data;  
                switch (eventName) {  
                    case 'profileDataReturned':  
                        this.receiveProfileDataReturned(event);
                        break;  
                    case 'getAllAccounts':  
                        this.receiveProfileDataReturned(event);
                        break;  
                    case 'getConnectedAccount':  
                        this.receiveGetConnectedAccount(event);
                        break;  
                    case 'getMessageSignature':  
                        this.receiveGetMessageSignature(event);
                        break;   
                    case 'verifyMessageSignature':  
                        this.receiveVerifyMessageSignature(event);
                        break;  
                    case 'getBalance':  
                        this.receiveGetBalance(event);
                        break;
                    case 'sendTransaction':  
                        this.receiveSendTransaction(event);
                        break;
                    case 'getBlockNumber':  
                        this.receiveGetBlockNumber(event);
                        break;
                    case 'getTransactionCount':  
                        this.receiveVerifyMessageSignature(event);
                        break;
                    case 'readFromContract':  
                        this.receiveReadFromContract(event);
                        break;
                    case 'writeToContract':  
                        this.receiveWriteToContract(event);
                        break;
                    case 'profilesConnectionCompleted':  
                        this.receiveProfileConnectionCompleted(event);
                        break;
                    case 'errorMessage':  
                        this.receiveErrorMessage(event);
                        break;
                }
            }, false);
            eventListenerAttached = true;
        }
        const { options } = this.props;
        const encodedApps = encodeURIComponent(options.apps);
        const currentUrl = encodeURIComponent(window.location.href); // Get current window URL

        frameUrl = `${baseUrl}`;
    }

    openSocialConnectPopup = () => {
        this.setState({
            iframeStyle: {
                ...this.state.iframeStyle,
                width: 765,
                height: 665,

            },
            isOpen: true,
            isDisabled: shouldDisableButton,
        });
    };

    openInvisiblePopup = () => {
        this.setState({
            iframeStyle: {
                ...this.state.iframeStyle,
                width: 0,
                height: 0,

            },
            isOpen: true,
            isDisabled: shouldDisableButton,
        });
        this.performAsyncTasks();
    };



    closeSocialConnectPopup = () => {
        this.setState({
            iframeStyle: {
                ...this.state.iframeStyle,
                width: 0,
                height: 0,
            },
            isOpen: false,
            isDisabled: shouldDisableButton,
        });

    };

    receiveProfileDataReturned = (event) => {
        const { onProfileDataReturned } = this.props;
        if (event.origin === baseUrl) {
            const data = event.data;
            //console.log('Received data from embedded popup:', data);
            if (onProfileDataReturned) {
                onProfileDataReturned(data);
            }
        }
    };

    receiveGetAllAccounts = (event) => {
        const { onGetAllAccounts } = this.props;
        if (event.origin === baseUrl) {
            const data = event.data;
            //console.log('Received data from embedded popup:', data);
            if (onGetAllAccounts) {
                onGetAllAccounts(data);
            }
        }
    };

    receiveGetConnectedAccount = (event) => {
        const { onGetConnectedAccount } = this.props;
        if (event.origin === baseUrl) {
            const data = event.data;
            //console.log('Received data from embedded popup:', data);
            if (onGetConnectedAccount) {
                onGetConnectedAccount(data);
            }
        }
    };

    receiveGetMessageSignature = (event) => {
        const { onGetMessageSignature } = this.props;
        if (event.origin === baseUrl) {
            const data = event.data;
            //console.log('Received data from embedded popup:', data);
            if (onGetMessageSignature) {
                onGetMessageSignature(data);
            }
        }
    };

    receiveVerifyMessageSignature = (event) => {
        const { onVerifyMessageSignature } = this.props;
        if (event.origin === baseUrl) {
            const data = event.data;
            //console.log('Received data from embedded popup:', data);
            if (onVerifyMessageSignature) {
                onVerifyMessageSignature(data);
            }
        }
    };

    receiveGetBalance = (event) => {
        const { onGetBalance } = this.props;
        if (event.origin === baseUrl) {
            const data = event.data;
            //console.log('Received data from embedded popup:', data);
            if (onGetBalance) {
                onGetBalance(data);
            }
        }
    };

    receiveSendTransaction = (event) => {
        const { onSendTransaction } = this.props;
        if (event.origin === baseUrl) {
            const data = event.data;
            //console.log('Received data from embedded popup:', data);
            if (onSendTransaction) {
                onSendTransaction(data);
            }
        }
    };

    receiveGetBlockNumber = (event) => {
        const { onGetBlockNumber } = this.props;
        if (event.origin === baseUrl) {
            const data = event.data;
            //console.log('Received data from embedded popup:', data);
            if (onGetBlockNumber) {
                onGetBlockNumber(data);
            }
        }
    };

    receiveGetTransactionCount = (event) => {
        const { onGetTransactionCount } = this.props;
        if (event.origin === baseUrl) {
            const data = event.data;
            //console.log('Received data from embedded popup:', data);
            if (onGetTransactionCount) {
                onGetTransactionCount(data);
            }
        }
    };

    receiveReadFromContract = (event) => {
        const { onReadFromContract } = this.props;
        if (event.origin === baseUrl) {
            const data = event.data;
            //console.log('Received data from embedded popup:', data);
            if (onReadFromContract) {
                onReadFromContract(data);
            }
        }
    };

    receiveWriteToContract = (event) => {
        const { onWriteToContract } = this.props;
        if (event.origin === baseUrl) {
            const data = event.data;
            //console.log('Received data from embedded popup:', data);
            if (onWriteToContract) {
                onWriteToContract(data);
            }
        }
    };

    receiveProfileConnectionCompleted = (event) => {
        if (event.origin === baseUrl) {
            const { data } = event.data;
            shouldDisableButton = data === "true";
        }
    };

    receiveErrorMessage = (event) => {
        const { onErrorMessage } = this.props;
        if (event.origin === baseUrl) {
            const data = event.data;
            //console.log('Received data from embedded popup:', data);
            if (onErrorMessage) {
                onErrorMessage(data);
            }
        }
    };

    static getAllAccounts = async () => {
        const iframe = document.getElementById('iframe');
        iframe.contentWindow.postMessage({ type: 'metamaskRequest', method: 'getAllAccounts' }, baseUrl);
    }

    static getConnectedAccount = async () => {
        const iframe = document.getElementById('iframe');
        iframe.contentWindow.postMessage({ type: 'metamaskRequest', method: 'getConnectedAccount' }, baseUrl);
    }

    static getMessageSignature = async (messageToSign) => {
        const iframe = document.getElementById('iframe');
        iframe.contentWindow.postMessage({ type: 'metamaskRequest', method: 'getMessageSignature', message: messageToSign.toString() }, baseUrl);
    }

    static verifyMessageSignature = async (plainMessage, signedMessage) => {
        const iframe = document.getElementById('iframe');
        iframe.contentWindow.postMessage({ type: 'metamaskRequest', method: 'verifyMessageSignature', message: plainMessage.toString(), signature: signedMessage.toString() }, baseUrl);
    }

    static getBalance = async () => {
        const iframe = document.getElementById('iframe');
        iframe.contentWindow.postMessage({ type: 'metamaskRequest', method: 'getBalance' }, baseUrl);
    }

    static sendTransaction = async (addressToSend, valueToSend) => {
        const iframe = document.getElementById('iframe');
        console.log(addressToSend, valueToSend);
        iframe.contentWindow.postMessage({ type: 'metamaskRequest', method: 'sendTransaction', sendTo: addressToSend.toString(), value: ethers.parseEther(valueToSend.toString()) }, baseUrl);
    }

    static getBlockNumber = async () => {
        const iframe = document.getElementById('iframe');
        iframe.contentWindow.postMessage({ type: 'metamaskRequest', method: 'getBlockNumber' }, baseUrl);
    }

    static getTransactionCount = async (addr) => {
        const iframe = document.getElementById('iframe');
        iframe.contentWindow.postMessage({ type: 'metamaskRequest', method: 'getTransactionCount', address: addr }, baseUrl);
    }

    static readFromContract = async (addr, abi, method_name, method_params) => {
        const iframe = document.getElementById('iframe');
        iframe.contentWindow.postMessage({
            type: 'metamaskRequest',
            method: 'readFromContract',
            contractAddress: addr,
            abi: abi,
            methodName: method_name,
            methodParams: method_params
        },
            baseUrl);
    }

    static writeToContract = async (addr, abi, method_name, method_params) => {
        const iframe = document.getElementById('iframe');
        iframe.contentWindow.postMessage({
            type: 'metamaskRequest',
            method: 'writeToContract',
            contractAddress: addr,
            abi: abi,
            methodName: method_name,
            methodParams: method_params
        },
            baseUrl);
    }

    clickme = () => {
        console.log("clicked")
        console.log(this.state.isDisabled)
    }
    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async performAsyncTasks() {
        await this.sleep(1);
        this.closeSocialConnectPopup();

    }
    
    componentDidMount() {
        this.openInvisiblePopup();
      }

    render() {
        return (
            <div>
                <button disabled={this.state.isDisabled} className="btn-flip" onClick={this.openSocialConnectPopup} data-back="Social" data-front={this.state.isDisabled ? "Connected" : "Connect"} style={{
                    "--height": this.props.customization?.height || '40px',
                    "--initialBackgroundColor": this.props.customization?.initialBackgroundColor || '#AE388B', "--initialTextColor": this.props.customization?.initialTextColor || '#ffffff',
                    "--flipBackgroundColor": this.props.customization?.flipBackgroundColor || '#EFEBE0',
                    "--flipTextColor": this.props.customization?.flipTextColor || '#AE388B',
                    width: this.props.customization?.width
                }}></button>

                <PluralityModal
                    closePlurality={this.closeSocialConnectPopup}
                    isOpen={!this.state.isOpen}
                    frameUrl={frameUrl}
                    style={this.state.iframeStyle} />
            </div>
        );
    }
}

export default PluralitySocialConnect;
