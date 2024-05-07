import React, { Component } from 'react';
import './buttonStyle.css'

const baseUrl = 'http://localhost:3000';
let frameUrl;
let eventListenerAttached = false;

class PluralityPopup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            iframeStyle: { width: 0, height: 0, border: 'none', position: 'absolute', scroll: 'hidden' },
            isOpen: false
        };
        // Attach event listener only once, outside of this function
        if (!eventListenerAttached) {
            window.addEventListener('message', this.receiveMessage, false);
            window.addEventListener('click', this.handleClickOutside, false);
            eventListenerAttached = true;
        }
        const { options } = this.props;
        const encodedApps = encodeURIComponent(options.apps);
        const currentUrl = encodeURIComponent(window.location.href); // Get current window URL

        frameUrl = `${baseUrl}/auth-pages/login?isWidget=true&apps=${encodedApps}&origin=${currentUrl}&id_platform=none`;
    }

    componentDidMount() {
        window.addEventListener('click', this.handleClickOutside, false);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleClickOutside, false);
    }



    openPluralityPopup = () => {
        this.setState({
            iframeStyle: {
                width: 450,
                height: 600,
                border: 'none',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
            },
            isOpen: true
        });
    };



    closePluralityPopup = () => {
        this.setState({
            iframeStyle: {
                width: 0,
                height: 0,
                border: 'none',
                position: 'absolute'
            },
            isOpen: false
        });
    };

    handleClickOutside = (event) => {
        const iframe = document.getElementById('iframe');
        const clickedElement = event.target;
        // Add tag names of buttons to exclude (outside the iframe)
        const excludedButtons = ['BUTTON', 'A'];

        // Check if the clicked element is within the iframe, 
        // not one of the excluded buttons, and if the popup is open
        if (!iframe.contains(clickedElement) && !excludedButtons.includes(clickedElement.tagName) && this.state.isOpen) {
            this.closePluralityPopup();
        }
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
                <a href='#' class="btn-flip" onClick={this.openPluralityPopup} data-back="Social" data-front="Connect" style={{
                    "--height": this.props.customization?.height || '40px',
                    "--initialBackgroundColor": this.props.customization?.initialBackgroundColor || '#AE388B', "--initialTextColor": this.props.customization?.initialTextColor || '#ffffff',
                    "--flipBackgroundColor": this.props.customization?.flipBackgroundColor || '#EFEBE0',
                    "--flipTextColor": this.props.customization?.flipTextColor || '#AE388B',
                    width: this.props.customization?.width
                }}></a>
                <div className="popup-container">
                    <div className="popup-content">
                        <button onClick={this.closePluralityPopup} disabled={!this.state.isOpen}>Close</button>
                        <iframe
                            title="PluralityPopup"
                            src={frameUrl}
                            frameBorder="0"
                            id="iframe"
                            style={this.state.iframeStyle}
                        ></iframe>
                    </div>
                </div>
            </div>
        );
    }
}

export default PluralityPopup;
