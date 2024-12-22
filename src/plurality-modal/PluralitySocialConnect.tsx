import React, { Component } from 'react';

import './styles.css'

import PluralityModal from './PluralityModal';
import PluralityApi from './PluralityApi'
import ProfileConnectedButton from './components/ConnectedProfile';
import ProfileButton from './components/profileButton';


const baseUrl = process.env.REACT_APP_WIDGET_BASE_URL
interface PluralitySocialConnectProps {
    options: {
        apps: string;
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

interface User {
    username: string;
    profileIcon: string;
    rating: number;
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
            showMask: false,
            isDisabled: false,
            isMetamaskConnected: false,
            isLitConnected: false,
            userData: {
                username: '',
                profileIcon: '',
                rating: 0
            }
        };
    }

    getBaseUrl() {
        if (!this.props.options.clientId) return baseUrl
        return `${baseUrl}/rsm?client_id=${this.props.options.clientId}`;
    }

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

    static getAllAccountsPromise = async () => {
        if (!this.checkLitConnection()) return;
        return PluralityApi.sendRequest("getAllAccounts");
    }

    static getConnectedAccountPromise = async () => {
        if (!this.checkLitConnection()) return;
        return await PluralityApi.sendRequest("getConnectedAccount");
    }

    static getBalancePromise = () => {
        if (!this.checkLitConnection()) return;
        return PluralityApi.sendRequest("getBalance");
    }

    static getMessageSignaturePromise = (messageToSign: string) => {
        if (!this.checkLitConnection()) return;
        return PluralityApi.sendRequest("getMessageSignature", messageToSign);
    }

    static verifyMessageSignaturePromise = (plainMessage: string, signedMessage: string) => {
        if (!this.checkLitConnection()) return;
        return PluralityApi.sendRequest("verifyMessageSignature", plainMessage, signedMessage);
    }

    static sendTransactionPromise = (addressToSend: string, amount: string) => {
        if (!this.checkLitConnection()) return;
        return PluralityApi.sendRequest("sendTransaction", addressToSend, amount);
    }

    static getBlockNumberPromise = () => {
        if (!this.checkLitConnection()) return;
        return PluralityApi.sendRequest("getBlockNumber");
    }

    static getTransactionCountPromise = (address: string) => {
        if (!this.checkLitConnection()) return;
        return PluralityApi.sendRequest("getTransactionCount", address);
    }

    static readFromContractPromise = (address: string, abi: string, methodName: string) => {
        if (!this.checkLitConnection()) return;
        return PluralityApi.sendRequest("readFromContract", address, abi, methodName, '');
    }

    static writeToContractPromise = (address: string, abi: string, methodName: string, methodParams: string) => {
        if (!this.checkLitConnection()) return;
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
        this.openInvisiblePopup();
        window.addEventListener("message", this.handleIframeMessage);
    }

    componentWillUnmount() {
        window.removeEventListener("message", this.handleIframeMessage);
    }

    handleIframeMessage = (event: MessageEvent) => {
        const baseUrl = this.getBaseUrl(); // Get baseUrl from prop or environment variable
        if (event.origin !== baseUrl) return;
        console.log("Event data: ", event.data)
        const { eventName, data } = event.data;
        if (eventName === "metamaskConnection") {
            this.setState({ isMetamaskConnected: data.isConnected })
            if (data?.isConnected) {
                localStorage.setItem('metamask', 'true')
            } else {
                localStorage.setItem('metamask', 'false')
            }
        } else if (eventName === "litConnection") {
            console.log("Inside")
            this.setState({ isLitConnected: data.isConnected })
            if (data?.isConnected) {
                localStorage.setItem('lit', 'true')
            } else {
                localStorage.setItem('lit', 'false')
            }
        } else if (eventName === "userData") {
            console.log("User Data");
            this.setState((prevState) => ({
                userData: {
                    ...prevState.userData,
                    username: data.name,
                    profileIcon: data.avatar,
                    rating: data.rating
                }
            }));
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
                            icon={this.state.userData.profileIcon}
                            name={this.state.userData.username}
                            ratings={this.state.userData.rating}
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

export default PluralitySocialConnect;
