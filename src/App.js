import React from 'react';
import PluralityPopupIframe from './PluralityPopupIframe';


const App = () => {
    const iframeUrl= "http://localhost:3000";    

    // Handle the data returned from the widget
    const handleDataReturned = (data) => {
        alert('Received data from iframe:'+ data);
        // Handle the received data in the external webpage
        // ... (perform actions with the received data)
        // Call connectWallet to ensure the user is connected to the dapp
       // connectWallet();
    };

    const sendMMAccountQuery = async () => {
        const iframe = document.getElementById('iframe');
        console.log(iframe);
        // Send MetaMask-related request to the iframe
        iframe.contentWindow.postMessage({ type: 'metamaskRequest', method: 'eth_requestAccounts' }, iframeUrl);
    }

    const sendMMSignQuery = async () => {
        const iframe = document.getElementById('iframe');
        console.log(iframe);
        // Send MetaMask-related request to the iframe
        iframe.contentWindow.postMessage({ type: 'metamaskRequest', method: 'personal_sign', message: "Example `personal_sign` message." }, iframeUrl);
    }

    const sendBalanceQuery = async () => {
        const iframe = document.getElementById('iframe');
        console.log(iframe);
        // Send MetaMask-related request to the iframe
        iframe.contentWindow.postMessage({ type: 'metamaskRequest', method: 'balance'}, iframeUrl);
    }

    return (
        <div>
            {/* Render the widget component */}
            <PluralityPopupIframe
                options={{ apps: 'facebook,twitter,lens' }}
                onDataReturned={handleDataReturned}
            />
            <button onClick={sendMMAccountQuery}>Send Metamask Account query</button>
            <br/>
            <button onClick={sendMMSignQuery}>Send Metamask Sign query</button>
            <br/>
            <button onClick={sendBalanceQuery}>Send Metamask Balance query</button>

        </div>
    );
};

export default App;
