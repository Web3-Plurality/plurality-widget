import React, { useEffect, Component } from 'react';

const widgetUrl = 'http://localhost:3000';
const url = 'http://localhost:3000/auth-pages/login/?isWidget=true&apps=${encodedApps}&origin=${currentUrl}';
const encodedApps = encodeURIComponent("facebook,twitter");
const currentUrl = encodeURIComponent(window.location.href); // Get current window URL

let style;
let eventListenerAttached = false;

class PluralityPopupIframe extends Component {

    constructor(props) {
        super(props);
        // Attach event listener only once, outside of this function
        if (!eventListenerAttached) {
            window.addEventListener('message', this.receiveMessage, false);
            eventListenerAttached = true;
        }
    }

    openPopup = () => {
        const iframe = document.getElementById('iframe');
        iframe.style = "width: 300; height: 500; border: 0; border: none; position: absolute;";
    }

    closePopup = () => {
        const iframe = document.getElementById('iframe');
        iframe.style = "width: 0; height: 0; border: 0; border: none; position: absolute;";
    }
    receiveMessage = (event) => {
        const { onDataReturned } = this.props;
        if (event.origin === widgetUrl) {
            console.log("Received message from iframe: "+onDataReturned);
            const data = event.data;
            console.log('Received data from opened window:', data);
            if (onDataReturned) {
                onDataReturned(data);
            }
        }
    };


    render() {
        return (
            <div>
                <h1>Widget Example</h1>
                <button onClick={this.openPopup}>
                    Reputation Connect
                </button>
                    <div className="popup-container">
                        <div className="popup-content">
                            <button onClick={this.closePopup}>Close</button>
                            <iframe
                                title="PluralityPopup"
                                src={url}
                                width="450"
                                height="600"
                                frameBorder="0"
                                id="iframe"
                                style={style}
                            ></iframe>
                        </div>
                    </div>
            </div>
        );
    }
}

export default PluralityPopupIframe;
