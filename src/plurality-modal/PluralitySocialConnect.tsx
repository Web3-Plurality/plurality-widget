import React, { Component } from 'react';

import PluralityModal from './PluralityModal.js';
import './buttonStyle.css'
import PluralityApi from './PluralityApi.ts';


//for local development
const baseUrl = "http://localhost:3000";

//for prod development
// const baseUrl = "https://app.plurality.network";

interface PluralitySocialConnectProps {
    options: {
        apps: string;
    };
    customization?: {
        height: string
        initialBackgroundColor: string
        initialTextColor: string
        flipBackgroundColor: string
        flipTextColor: string
        width: string
    }
}

interface PluralitySocialConnectState {
    iframeStyle: React.CSSProperties;
    isOpen: boolean;
    isDisabled: boolean;
    isMetamaskConnected: boolean
}

const shouldDisableButton: boolean = false;

class PluralitySocialConnect extends Component<PluralitySocialConnectProps, PluralitySocialConnectState> {

    constructor(props: PluralitySocialConnectProps) {
        super(props);

        this.state = {
            iframeStyle: {
                width: '100%',
                height: 0,
                border: 'none',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'transparent',
            },
            isOpen: false,
            isDisabled: false,
            isMetamaskConnected: false
        };
    }

    openSocialConnectPopup = () => {
        localStorage.setItem("isOpen", 'true')
        this.setState({
            iframeStyle: {
                ...this.state.iframeStyle,
                width: '100%',
                height: 600,

            },
            isOpen: true,
            isDisabled: shouldDisableButton,
        });

        const iframe = document.getElementById('iframe') as HTMLIFrameElement;
        if (iframe?.contentWindow) {
            iframe.contentWindow.postMessage({ data: 'refresh' }, baseUrl);
        }
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

    static checkMetamaskConnection = () => {
        const isConnected = localStorage.getItem('metamask') || '';
        if (!JSON.parse(isConnected)) {
            alert('Connect Metamask first');
            return false;
        }
        return true;
    };

    static checkIsWidgetOpen = () => {
        const isWidgetOpen = localStorage.getItem('isOpen') || '';
        if (!JSON.parse(isWidgetOpen)) {
            alert('Please open the Widget first');
            return false;
        }
        return true;
    };

    static getAllAccountsPromise = async () => {
        if (!this.checkIsWidgetOpen()) return;
        if (!this.checkMetamaskConnection()) return;
        return PluralityApi.sendRequest("getAllAccounts");
    }

    static getConnectedAccountPromise = async () => {
        if (!this.checkIsWidgetOpen()) return;
        if (!this.checkMetamaskConnection()) return;
        return await PluralityApi.sendRequest("getConnectedAccount");

    }

    static getBalancePromise = () => {
        if (!this.checkIsWidgetOpen()) return;
        if (!this.checkMetamaskConnection()) return;
        return PluralityApi.sendRequest("getBalance");
    }

    static getMessageSignaturePromise = (messageToSign: string) => {
        if (!this.checkIsWidgetOpen()) return;
        if (!this.checkMetamaskConnection()) return;
        return PluralityApi.sendRequest("getMessageSignature", messageToSign);
    }

    static verifyMessageSignaturePromise = (plainMessage: string, signedMessage: string) => {
        if (!this.checkIsWidgetOpen()) return;
        if (!this.checkMetamaskConnection()) return;
        return PluralityApi.sendRequest("verifyMessageSignature", plainMessage, signedMessage);
    }

    static sendTransactionPromise = (addressToSend: string, amount: string) => {
        if (!this.checkIsWidgetOpen()) return;
        if (!this.checkMetamaskConnection()) return;
        return PluralityApi.sendRequest("sendTransaction", addressToSend, amount);
    }

    static getBlockNumberPromise = () => {
        if (!this.checkIsWidgetOpen()) return;
        if (!this.checkMetamaskConnection()) return;
        return PluralityApi.sendRequest("getBlockNumber");
    }

    static getTransactionCountPromise = (address: string) => {
        if (!this.checkIsWidgetOpen()) return;
        if (!this.checkMetamaskConnection()) return;
        return PluralityApi.sendRequest("getTransactionCount", address);
    }

    static readFromContractPromise = (address: string, abi: string, methodName: string) => {
        if (!this.checkIsWidgetOpen()) return;
        if (!this.checkMetamaskConnection()) return;
        return PluralityApi.sendRequest("readFromContract", address, abi, methodName, '');
    }

    static writeToContractPromise = (address: string, abi: string, methodName: string, methodParams: string) => {
        if (!this.checkIsWidgetOpen()) return;
        if (!this.checkMetamaskConnection()) return;
        return PluralityApi.sendRequest("writeToContract", address, abi, methodName, methodParams);
    }

    sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async performAsyncTasks() {
        await this.sleep(1);
        this.closeSocialConnectPopup();

    }

    componentDidMount() {
        const isOpen = localStorage.getItem('isOpen');

        if (isOpen === 'true') {
            this.setState({
                iframeStyle: {
                    ...this.state.iframeStyle,
                    width: '100%',
                    height: 600,
                },
                isOpen: true,
                isDisabled: shouldDisableButton,
            });
        } else {
            this.openInvisiblePopup();
        }

        window.addEventListener("message", this.handleIframeMessage);
    }

    componentWillUnmount() {
        window.removeEventListener("message", this.handleIframeMessage);
    }

    handleIframeMessage = (event: MessageEvent) => {
        if (event.origin !== baseUrl) return;

        const { eventName, data } = event.data;
        if (eventName === "metamaskConnection") {
            this.setState({ isMetamaskConnected: data.isConnected })
            if (data?.isConnected) {
                localStorage.setItem('metamask', 'true')
            } else {
                localStorage.setItem('metamask', 'false')
            }
        }

        if (eventName === "smartProfileData") {
            window.localStorage.setItem("smartProfileData", data.profileData)
        }
    };


    render() {
        return (
            <div>
                <button
                    disabled={this.state.isDisabled}
                    className="btn-flip"
                    onClick={this.openSocialConnectPopup}
                    data-back={this.state.isMetamaskConnected ? "Connected" : "Social"}
                    data-front={this.state.isMetamaskConnected ? "Metamask" : "Connect"}
                    style={{
                        "--height": this.props?.customization?.height || '40px',
                        "--initialBackgroundColor": this.props.customization?.initialBackgroundColor || '#AE388B',
                        "--initialTextColor": this.props?.customization?.initialTextColor || '#ffffff',
                        "--flipBackgroundColor": this.props.customization?.flipBackgroundColor || '#EFEBE0',
                        "--flipTextColor": this.props?.customization?.flipTextColor || '#AE388B',
                        width: this.props?.customization?.width
                    } as React.CSSProperties}
                ></button>

                <PluralityModal
                    closePlurality={this.closeSocialConnectPopup}
                    isOpen={!this.state.isOpen}
                    frameUrl={baseUrl}
                    style={this.state.iframeStyle} />
            </div>
        );
    }
}

export default PluralitySocialConnect;
