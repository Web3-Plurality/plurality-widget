import React, { useEffect, Component } from 'react';
import './buttonStyle.css'

const baseUrl = 'http://localhost:3000';
let frameUrl;
let style;
let eventListenerAttached = false;

class PluralityPopup extends Component {

    constructor(props) {
        super(props);
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
        const iframe = document.getElementById('iframe');
        iframe.style = "width: 300; height: 500; border: 0; border: none; position: absolute;";
    }

    closePluralityPopup = () => {
        const iframe = document.getElementById('iframe');
        iframe.style = "width: 0; height: 0; border: 0; border: none; position: absolute;";
    }

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
                <a href="#" class="btn-flip" onClick={this.openPluralityPopup} data-back="Social" data-front="Connect" style={{"--height": this.props.customization?.height || '40px', 
                "--initialBackgroundColor": this.props.customization?.initialBackgroundColor || '#AE388B', "--initialTextColor": this.props.customization?.initialTextColor || '#ffffff', 
                "--flipBackgroundColor": this.props.customization?.flipBackgroundColor || '#EFEBE0', 
                "--flipTextColor": this.props.customization?.flipTextColor || '#AE388B',
                width: this.props.customization?.width }}></a>
                    <div className="popup-container">
                        <div className="popup-content">
                            <button onClick={this.closePluralityPopup}>Close</button>
                            <iframe
                                title="PluralityPopup"
                                src={frameUrl}
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

export default PluralityPopup;
