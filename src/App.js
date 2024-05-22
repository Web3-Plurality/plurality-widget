import React, { useRef } from 'react';
import PluralitySocialConnect from './plurality-modal/PluralitySocialConnect';

const App = () => {

    const childRef = useRef(null);
    const abi = '[{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
    
    // Profile data handle
    const handleProfileDataReturned = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Get profile data:", receivedData);
        alert(JSON.stringify(data));
        childRef.current.closeSocialConnectPopup();
    };

    // Web3 function handles
    const handleGetAllAccounts = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Get all accounts:", receivedData);
        alert(JSON.stringify(data));
    };
    const handleGetConnectedAccount = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Get connected account:", receivedData);
        alert(JSON.stringify(data));
    };
    const handleMessageSignature = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Get message signature:", receivedData);
        alert(JSON.stringify(data));
    };
    const handleVerifyMessageSignature = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Verify message signature:", receivedData);
        alert(JSON.stringify(data));
    };
    const handleGetBalance = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Get balance:", receivedData);
        alert(JSON.stringify(data));
    };
    const handleSendTransaction = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Send transaction:", receivedData);
        alert(JSON.stringify(data));
    };
    const handleGetBlockNumber = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Get block number:", receivedData);
        alert(JSON.stringify(data));
    };
    const handleGetTransactionCount = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Get transaction count:", receivedData);
        alert(JSON.stringify(data));
    };
    const handleReadFromContract = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Read from contract:", receivedData);
        alert(JSON.stringify(data));
    };
    const handleWriteToContract = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Write to contract:", receivedData);
        alert(JSON.stringify(data));
    };
    const handleErrorMessage = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Get error message:", receivedData);
        alert(JSON.stringify(data));
    };

    return (
        <div>
            {/* Render the widget component */}
            <PluralitySocialConnect
                options={{ apps: 'facebook,twitter' }}
                onProfileDataReturned={handleProfileDataReturned}
                onGetAllAccounts={handleGetAllAccounts}
                onGetConnectedAccount={handleGetConnectedAccount}
                onGetMessageSignature={handleMessageSignature}
                onVerifyMessageSignature={handleVerifyMessageSignature}
                onGetBalance={handleGetBalance}
                onSendTransaction={handleSendTransaction}
                onGetBlockNumber={handleGetBlockNumber}
                onGetTransactionCount={handleGetTransactionCount}
                onReadFromContract={handleReadFromContract}
                onWriteToContract={handleWriteToContract}
                onErrorMessage={handleErrorMessage}
                //customization={{ height: '200px', width: '500px', initialBackgroundColor: '#E8A123', initialTextColor: '#FFFFFF', flipBackgroundColor: '#12AE83', flipTextColor: '#FFFFFF'}}
                ref={childRef}
            />
            <button onClick={() => PluralitySocialConnect.getAllAccounts()}>Get All Accounts</button>
            <br/>
            <button onClick={() => PluralitySocialConnect.getConnectedAccount()}>Get Connected Account</button>
            <br/>
            <button onClick={() => PluralitySocialConnect.getMessageSignature("Example `personal_sign` message.")}>Sign Message</button>
            <br/>
            <button onClick={() => PluralitySocialConnect.verifyMessageSignature("Example `personal_sign` message.", "0xa1379711716d214c84c146bbaa9d03d77895526b8620bcae67a76f824be6fd3a43795645a31f758eaed39ee6aa5490a979233711d4e9d6a2e30fa09a5e9c808a1b")}>Verify Message</button>
            <br/>
            <button onClick={() => PluralitySocialConnect.getBalance()}>Get Balance</button>
            <br/>
            <button onClick={() => PluralitySocialConnect.sendTransaction("0xe613B4cd69Fe20E8bd0F0D79a264210886bA1AA2","0.01")}>Send Transaction</button>
            <br/>
            <button onClick={() => PluralitySocialConnect.getBlockNumber()}>Get Block Number</button>
            <br/>
            <button onClick={() => PluralitySocialConnect.getTransactionCount("0xe613B4cd69Fe20E8bd0F0D79a264210886bA1AA2")}>Get Transaction count</button>
            <br/>
            <button onClick={() => PluralitySocialConnect.readFromContract("0x8E26aa0b6c7A396C92237C6a87cCD6271F67f937",abi,"retrieve")}>Read Contract</button>
            <br/>
            <button onClick={() => PluralitySocialConnect.writeToContract("0x8E26aa0b6c7A396C92237C6a87cCD6271F67f937",abi, "store", "5")}>Write Contract</button>
            
        </div>
    );
};

export default App;
