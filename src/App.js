import React from 'react';
import PluralityPopup from './PluralityPopup';
import { parseEther } from 'ethers';

const App = () => {
    const iframeUrl= "http://localhost:3000";    

    // Handle the data returned from the widget
    const handleDataReturned = (data) => {
        alert('Received data from iframe:'+ data);
        // Handle the received data in the external webpage
        // ... (perform actions with the received data)
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
        iframe.contentWindow.postMessage({ type: 'metamaskRequest', method: 'getBalance'}, iframeUrl);
    }

    const sendTransaction = async () => {
        const iframe = document.getElementById('iframe');
        console.log(iframe);
        // Send MetaMask-related request to the iframe
        iframe.contentWindow.postMessage({ type: 'metamaskRequest', method: 'sendTransaction', sendTo: "0xe613B4cd69Fe20E8bd0F0D79a264210886bA1AA2", value: parseEther("0.01")}, iframeUrl);
    }
    return (
        <div>
            {/* Render the widget component */}
            <PluralityPopup
                options={{ apps: 'facebook,twitter,lens' }}
                onDataReturned={handleDataReturned}
            />
            <button onClick={sendMMAccountQuery}>Send Metamask Account query</button>
            <br/>
            <button onClick={sendMMSignQuery}>Send Metamask Sign query</button>
            <br/>
            <button onClick={sendBalanceQuery}>Send Metamask Balance query</button>
            <br/>
            <button onClick={sendTransaction}>Send Metamask Transaction</button>
        </div>
    );
};

export default App;
