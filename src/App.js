import React from 'react';
import PluralityPopup from './PluralityPopup';
import { parseEther } from 'ethers';
import {getConnectedAccount, getMessageSignature, getBalance, sendTransaction} from "./Web3ProxyLibrary";
const App = () => {

    // Handle the data returned from the widget
    const handleDataReturned = (data) => {
        console.log(data);
        alert(data.toString());
        // Handle the received data in the external webpage
        // ... (perform actions with the received data)
    };

    return (
        <div>
            {/* Render the widget component */}
            <PluralityPopup
                options={{ apps: 'facebook,twitter,lens' }}
                onDataReturned={handleDataReturned}
            />
            <button onClick={() => getConnectedAccount()}>Send Metamask Account query</button>
            <br/>
            <button onClick={() => getMessageSignature("Example `personal_sign` message.")}>Send Metamask Sign query</button>
            <br/>
            <button onClick={() => getBalance()}>Send Metamask Balance query</button>
            <br/>
            <button onClick={() => sendTransaction("0xe613B4cd69Fe20E8bd0F0D79a264210886bA1AA2","0.01")}>Send Metamask Transaction</button>
        </div>
    );
};

export default App;
