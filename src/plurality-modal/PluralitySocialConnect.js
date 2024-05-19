import React, { Component } from 'react';
import './buttonStyle.css'
import PluralityModal from './PluralityModal';

import { ethers } from 'ethers';


//for local development
const baseUrl = "http://localhost:3000";

//for prod development
//const baseUrl = "https://app.plurality.network";


let frameUrl;
let eventListenerAttached = false;

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
            isOpen: false
        };
        // Attach event listener only once, outside of this function
        if (!eventListenerAttached) {
            window.addEventListener('message', this.receiveMessage, false);
            eventListenerAttached = true;
        }
        const { options } = this.props;
        const encodedApps = encodeURIComponent(options.apps);
        const currentUrl = encodeURIComponent(window.location.href); // Get current window URL

        frameUrl = `${baseUrl}/auth-pages/login?isWidget=true&apps=${encodedApps}&origin=${currentUrl}&id_platform=none`;
    }

    openSocialConnectPopup = () => {
        this.setState({
            iframeStyle: {
                ...this.state.iframeStyle,
                width: 460,
                height: 600,

            },
            isOpen: true,
        });
    };



    closeSocialConnectPopup = () => {
        this.setState({
            iframeStyle: {
                ...this.state.iframeStyle,
                width: 0,
                height: 0,
            },
            isOpen: false,
        });
    };

    receiveMessage = (event) => {
        const { onDataReturned } = this.props;
        if (event.origin === baseUrl) {
            const data = event.data;
            //console.log('Received data from embedded popup:', data);
            if (onDataReturned) {
                onDataReturned(data);
            }
        }
    };

    // Web3 proxy functions

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

    render() {
        return (
            <div>
                <a href='#' className="btn-flip" onClick={this.openSocialConnectPopup} data-back="Social" data-front="Connect" style={{
                    "--height": this.props.customization?.height || '40px',
                    "--initialBackgroundColor": this.props.customization?.initialBackgroundColor || '#AE388B', "--initialTextColor": this.props.customization?.initialTextColor || '#ffffff',
                    "--flipBackgroundColor": this.props.customization?.flipBackgroundColor || '#EFEBE0',
                    "--flipTextColor": this.props.customization?.flipTextColor || '#AE388B',
                    width: this.props.customization?.width
                }}></a>

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
