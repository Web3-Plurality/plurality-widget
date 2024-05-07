import React, { Component } from 'react';
import './buttonStyle.css'

const widgetUrl = 'https://mvfw.plurality.network/auth-pages/login';

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
        //const left = (window.innerWidth - width) / 2;
        //const top = (window.innerHeight - height) / 2;
        const left = 500;
        const top = 100;

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
        let parsedUrl = new URL(widgetUrl);
        // If the URL has a port, include it in the result
        const port = parsedUrl.port ? `:${parsedUrl.port}` : '';

        parsedUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}${port}`;

        if (event.origin === parsedUrl) {
            const data = event.data;
            console.log('Received data from opened window:', data);
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
                <a href="#" className="btn-flip" onClick={this.openPluralityPopup} data-back="Plurality" data-front="Connect" style={{
                    "--height": this.props.customization?.height || '40px',
                    "--initialBackgroundColor": this.props.customization?.initialBackgroundColor || '#AE388B', "--initialTextColor": this.props.customization?.initialTextColor || '#ffffff',
                    "--flipBackgroundColor": this.props.customization?.flipBackgroundColor || '#EFEBE0',
                    "--flipTextColor": this.props.customization?.flipTextColor || '#AE388B',
                    width: this.props.customization?.width
                }}></a>
            </div>
        );
    }
}

export default PluralityPopupWidget;
