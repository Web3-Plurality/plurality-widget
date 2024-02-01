import React from 'react';
import PluralityPopupWidget from './PluralityPopupWidget';


const App = () => {

    // Function to connect the wallet
    const connectWallet = () => {
        // Check if MetaMask is installed
        if (window.ethereum) {
            // Check if the user is connected
            window.ethereum
                .request({ method: 'eth_accounts' })
                .then((accounts) => {
                    if (accounts.length === 0) {
                        // User is not connected, prompt to connect
                        window.ethereum
                            .request({ method: 'eth_requestAccounts' })
                            .then((newAccounts) => {
                                console.log('Wallet connected. New accounts:', newAccounts);
                                // Proceed with actions using the connected wallet
                                // ... (perform actions with the received data)
                            })
                            .catch((error) => {
                                console.error('Error connecting wallet:', error);
                            });
                    }
                })
                .catch((error) => {
                    console.error('Error checking wallet connection:', error);
                });
        } else {
            console.log('MetaMask not installed. Please install MetaMask.');
        }
    };    

    // Handle the data returned from the widget
    const handleDataReturned = (data) => {
        console.log('Received data from widget:', data);
        // Handle the received data in the external webpage
        // ... (perform actions with the received data)
        // Call connectWallet to ensure the user is connected to the dapp
        connectWallet();
    };

    return (
        <div>
            {/* Render the widget component */}
            <PluralityPopupWidget
                options={{ apps: 'facebook,twitter' }}
                //options={{ apps: 'twitter' }}
                onDataReturned={handleDataReturned}
                // all customization params are optional
                // customization={{ height: '200px', width: '500px', initialBackgroundColor: '#E8A123', initialTextColor: '#FFFFFF', flipBackgroundColor: '#12AE83', flipTextColor: '#FFFFFF'}}
            />
        </div>
    );
};

export default App;
