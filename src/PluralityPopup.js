import React, { Component } from 'react';
import './buttonStyle.css'
import PluralityModal from './components/PluralityModal';

const baseUrl = 'http://localhost:3000';
let frameUrl;
let eventListenerAttached = false;

class PluralityPopup extends Component {

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

    openPluralityPopup = () => {
        this.setState({
            iframeStyle: {
                ...this.state.iframeStyle,
                width: 460,
                height: 600,

            },
            isOpen: true
        });
    };



    closePluralityPopup = () => {
        this.setState({
            iframeStyle: {
                ...this.state.iframeStyle,
                width: 0,
                height: 0,
            },
            isOpen: false
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


    render() {
        return (
            <div>
                <a href='#' className="btn-flip" onClick={this.openPluralityPopup} data-back="Social" data-front="Connect" style={{
                    "--height": this.props.customization?.height || '40px',
                    "--initialBackgroundColor": this.props.customization?.initialBackgroundColor || '#AE388B', "--initialTextColor": this.props.customization?.initialTextColor || '#ffffff',
                    "--flipBackgroundColor": this.props.customization?.flipBackgroundColor || '#EFEBE0',
                    "--flipTextColor": this.props.customization?.flipTextColor || '#AE388B',
                    width: this.props.customization?.width
                }}></a>

                <PluralityModal
                    closePlurality={this.closePluralityPopup}
                    isOpen={!this.state.isOpen}
                    frameUrl={frameUrl}
                    style={this.state.iframeStyle} />
            </div>
        );
    }
}

export default PluralityPopup;
