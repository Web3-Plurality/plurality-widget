import React from 'react';
import PluralityPopup from './PluralityPopup';
import { parseEther } from 'ethers';
import { getConnectedAccount, 
         getMessageSignature, 
         getBalance, 
         sendTransaction, 
         getAllAccounts, 
         getTransactionCount,
         verifyMessageSignature,
         getBlockNumber} from "./Web3ProxyLibrary";
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
            <button onClick={() => getAllAccounts()}>Get All Accounts</button>
            <br/>
            <button onClick={() => getConnectedAccount()}>Get Connected Account</button>
            <br/>
            <button onClick={() => getMessageSignature("Example `personal_sign` message.")}>Sign Message</button>
            <br/>
            <button onClick={() => verifyMessageSignature("Example `personal_sign` message.", "0xa1379711716d214c84c146bbaa9d03d77895526b8620bcae67a76f824be6fd3a43795645a31f758eaed39ee6aa5490a979233711d4e9d6a2e30fa09a5e9c808a1b")}>Verify Message</button>
            <br/>
            <button onClick={() => getBalance()}>Get Balance</button>
            <br/>
            <button onClick={() => sendTransaction("0xe613B4cd69Fe20E8bd0F0D79a264210886bA1AA2","0.01")}>Send Transaction</button>
            <br/>
            <button onClick={() => getBlockNumber()}>Get Block Number</button>
            <br/>
            <button onClick={() => getTransactionCount("0xe613B4cd69Fe20E8bd0F0D79a264210886bA1AA2")}>Get Transaction count</button>
            
        </div>
    );
};

export default App;
