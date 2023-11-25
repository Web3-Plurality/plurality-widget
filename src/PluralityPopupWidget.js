import React, { Component } from 'react';

const widgetUrl = 'https://plurality.westeurope.cloudapp.azure.com/auth-pages/login';

class PluralityPopupWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pluralityPopup: null
        };
    }

    openPluralityPopup = () => {
        const { options } = this.props;
        const encodedApps = encodeURIComponent(options.apps);
        const currentUrl = encodeURIComponent(window.location.href); // Get current window URL

        const url = `${widgetUrl}/?isWidget=true&apps=${encodedApps}&origin=${currentUrl}`;

        const width = 450;
        const height = 600;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;

        const pluralityPopup = window.open(url, 'PluralityPopup', `width=${width}, height=${height}, top=${top}, left=${left}`);

        this.setState({ pluralityPopup });

        // Attach event listener only once, outside of this function
        if (!this.eventListenerAttached) {
            window.addEventListener('message', this.receiveMessage, false);
            this.eventListenerAttached = true;
        }
    };

    receiveMessage = (event) => {
        const { onDataReturned } = this.props;

        if (event.origin === widgetUrl) {
            const data = event.data;
            //console.log('Received data from opened window:', data);
            if (onDataReturned) {
                onDataReturned(data);
            }

            // Remove the event listener after handling the message
            window.removeEventListener('message', this.receiveMessage);
            this.eventListenerAttached = false; // Reset the flag
        }
    };

    render() {
        return (
            <div>
                <button onClick={this.openPluralityPopup}>
                    Reputation Connect
                </button>
            </div>
        );
    }
}

export default PluralityPopupWidget;
