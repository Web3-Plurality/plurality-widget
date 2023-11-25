import React, { Component } from 'react';

class PluralityPopupWidget extends Component {
    constructor() {
        super();
        this.state = {
            isPopupVisible: false
        };
    }

    openPopup = () => {
        this.setState({ isPopupVisible: true });
    }

    closePopup = () => {
        this.setState({ isPopupVisible: false });
    }

    render() {
        return (
            <div>
                <h1>Widget Example</h1>
                <button onClick={this.openPopup}>
                    Reputation Connect
                </button>
                {this.state.isPopupVisible && (
                    <div className="popup-container">
                        <div className="popup-content">
                            <button onClick={this.closePopup}>Close</button>
                            <iframe
                                title="PluralityPopup"
                                src="https://plurality.westeurope.cloudapp.azure.com/"
                                width="450"
                                height="600"
                                frameBorder="0"
                            ></iframe>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default PluralityPopupWidget;
