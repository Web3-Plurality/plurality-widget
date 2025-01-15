import React, { Component } from 'react';
import './css/styles.css'

import PluralityModal from './PluralityModal';
import PluralityApi from './PluralityApi'
import ProfileConnectedButton from './components/ConnectedProfile';
import ProfileButton from './components/profileButton';
import { User } from './types/payloadTypes';
import { message } from 'antd';


const baseUrl = process.env.REACT_APP_WIDGET_BASE_URL
interface PluralitySocialConnectProps {
    options: {
        clientId?: string;
        theme: string
    };
    customization?: {
        height: string;
        initialBackgroundColor: string;
        initialTextColor: string;
        flipBackgroundColor: string;
        flipTextColor: string;
        width: string;
    };
}

interface PluralitySocialConnectState {
    iframeStyle: React.CSSProperties;
    isOpen: boolean;
    showMask: boolean;
    isDisabled: boolean;
    isMetamaskConnected: boolean;
    isLitConnected: boolean;
    userData: User;
}

const shouldDisableButton: boolean = false;

export class PluralitySocialConnect extends Component<PluralitySocialConnectProps, PluralitySocialConnectState> {

    private static instance: PluralitySocialConnect | null = null;

    constructor(props: PluralitySocialConnectProps) {
        super(props);
        PluralitySocialConnect.instance = this;

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
            showMask: false,
            isDisabled: false,
            isMetamaskConnected: false,
            isLitConnected: false,
            userData: {
                username: '',
                profileIcon: '',
                ratings: 0,
                scores: [],
                consent: false
            }
        };
    }

    getBaseUrl() {
        if (!this.props.options.clientId) return baseUrl
        return `${baseUrl}/rsm?client_id=${this.props.options.clientId}`;
    }

    static openSocialConnectPopup = () => {
        if (this.instance) {
            this.instance.openSocialConnectPopup();
        }
    };

    openSocialConnectPopup = () => {
        const targetOrigin = this.getBaseUrl() || '*';
        this.setState({
            iframeStyle: {
                ...this.state.iframeStyle,
                width: '100%',
                height: 600,
            },
            isOpen: true,
            showMask: true,
            isDisabled: shouldDisableButton,
        });

        const iframe = document.getElementById('iframe') as HTMLIFrameElement;
        if (iframe?.contentWindow) {
            iframe.contentWindow.postMessage({ data: 'refresh' }, targetOrigin);
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

    static checkLitConnection = () => {
        const isConnected = localStorage.getItem('lit') || 'false';
        if (!JSON.parse(isConnected)) {
            alert('Connect Profile first');
            return false;
        }
        return true;
    };

    static getAllAccounts = async (rpc: string = '', chainId: string = '') => {
        if (!this.checkLitConnection()) return;
        return PluralityApi.sendRequest("getAllAccounts");
    }

    static getConnectedAccount = async (rpc: string = '', chainId: string = '') => {
        if (!this.checkLitConnection()) return;
        return await PluralityApi.sendRequest("getConnectedAccount");
    }

    static getBalance = (rpc: string = '', chainId: string = '') => {
        if (!this.checkLitConnection()) return;
        return PluralityApi.sendRequest("getBalance");
    }

    static getMessageSignature = (messageToSign: string) => {
        if (!this.checkLitConnection()) return;
        if (this.instance) {
            this.instance.openSocialConnectPopup();
        }
        return PluralityApi.sendRequest("getMessageSignature", messageToSign);
    }

    static verifyMessageSignature = (plainMessage: string, signedMessage: string) => {
        if (!this.checkLitConnection()) return;
        return PluralityApi.sendRequest("verifyMessageSignature", plainMessage, signedMessage);
    }

    static sendTransaction = (rawTx: string, rpc: string = '', chainId: string = '') => {
        if (!this.checkLitConnection()) return;
        if (this.instance) {
            this.openSocialConnectPopup()
        }
        return PluralityApi.sendRequest("sendTransaction", rawTx, rpc, chainId);
    }

    static getBlockNumber = (rpc: string = '', chainId: string = '') => {
        if (!this.checkLitConnection()) return;
        return PluralityApi.sendRequest("getBlockNumber");
    }

    static getTransactionCount = (address: string, rpc: string = '', chainId: string = '') => {
        if (!this.checkLitConnection()) return;
        return PluralityApi.sendRequest("getTransactionCount", address, rpc, chainId);
    }

    static readFromContract = (address: string, abi: string, methodName: string, methodParams: string, rpc: string = '', chainId: string = '') => {
        if (!this.checkLitConnection()) return;
        return PluralityApi.sendRequest("readFromContract", address, abi, methodName, methodParams, rpc, chainId);
    }

    static writeToContract = (address: string, abi: string, methodName: string, methodParams: string, rpc: string = '', chainId: string = '', options: string) => {
        if (!this.checkLitConnection()) return;
        if (this.instance) {
            this.instance.openSocialConnectPopup();
        }
        return PluralityApi.sendRequest("writeToContract", address, abi, methodName, methodParams, rpc, chainId, options);
    }
    // EAS Immplementation
    static setPublicData = (key: string, value: string) => {
        if (!this.checkLitConnection()) return;
        return PluralityApi.sendRequest("setPublicData", key, value);
    }
    static getPublicData = (key: string) => {
        if (!this.checkLitConnection()) return;
        return PluralityApi.sendRequest("getPublicData", key);
    }
    static setPrivateData = (key: string, value: string) => {
        if (!this.checkLitConnection()) return;
        return PluralityApi.sendRequest("setPrivateData", key, value);
    }
    static getPrivateData = (key: string) => {
        if (!this.checkLitConnection()) return;
        return PluralityApi.sendRequest("getPrivateData", key);
    }
    static getSmartProfileData = () => {
        if (!this.checkLitConnection()) return;
        if (this.instance) {
            this.instance.openSocialConnectPopup();
        }
        return PluralityApi.sendRequest("getSmartProfile");
    }

    // static switchNetwork = (rpc: string, chainId: string) => {
    //     if (!this.checkLitConnection()) return;
    //     return PluralityApi.sendRequest("switchNetwork", rpc, chainId);
    // }

    // static fetchNetwork = () => {
    //     if (!this.checkLitConnection()) return;
    //     return PluralityApi.sendRequest("fetchNetwork");
    // }

    sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async performAsyncTasks() {
        await this.sleep(1);
        this.closeSocialConnectPopup();
    }

    componentDidMount() {
        this.openInvisiblePopup();
        window.addEventListener("message", this.handleIframeMessage);
    }

    componentWillUnmount() {
        window.removeEventListener("message", this.handleIframeMessage);
    }

    handleIframeMessage = (event: MessageEvent) => {
        const baseUrl = this.getBaseUrl();
        if (event.origin !== baseUrl) return;
        const { eventName, data } = event.data;
        if (eventName === "metamaskConnection") {
            this.setState({ isMetamaskConnected: data.isConnected })
            if (data?.isConnected) {
                localStorage.setItem('metamask', 'true')
            } else {
                localStorage.setItem('metamask', 'false')
            }
        } else if (eventName === "litConnection") {
            this.setState({ isLitConnected: data.isConnected })
            if (data?.isConnected) {
                localStorage.setItem('lit', 'true')
            } else {
                localStorage.setItem('lit', 'false')
            }
        } else if (eventName === "userData") {
            this.setState((prevState) => ({
                userData: {
                    ...prevState.userData,
                    username: data.name,
                    profileIcon: data.avatar,
                    ratings: data.rating,
                    consent: data.consent,
                    ...(data.scores && { scores: data.scores })
                }
            }));
            localStorage.setItem('userData', JSON.stringify(data))
        } else if (eventName === "consentData" || eventName === "getMessageSignature") {
            if (data?.consent || eventName === "getMessageSignature") {
                this.closeSocialConnectPopup();
            }
        } else if (eventName === "walletSendTransaction") {
            console.log("Wallet tsx", data)
            message.error(data)
        }

        if (eventName === "smartProfileData") {
            window.localStorage.setItem("smartProfileData", data.profileData)
        }
    };

    render() {
        return (
            <>
                {
                    this.state.isMetamaskConnected || this.state.isLitConnected
                        ? <ProfileConnectedButton
                            theme={this.props.options.theme}
                            userData={this.state.userData}
                            handleClick={this.openSocialConnectPopup}
                        />
                        : <ProfileButton handleClick={this.openSocialConnectPopup} />
                }

                <PluralityModal
                    closePlurality={this.closeSocialConnectPopup}
                    isOpen={!this.state.isOpen}
                    showMask={this.state.showMask}
                    frameUrl={this.getBaseUrl()}
                    style={this.state.iframeStyle} />
            </>
        );
    }
}
