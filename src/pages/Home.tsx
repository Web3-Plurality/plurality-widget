import React from 'react'
import PluralitySocialConnect from './../plurality-modal/PluralitySocialConnect'
import { AllAccountsDataType, ConnectedAccountDataType, SignMessageDataType, VerifySignedMessageDataType } from '../types';

const Home = () => {
    const options = { apps: "example" };

    const getAllAccounts = async () => {
        const response = (await PluralitySocialConnect.getAllAccountsPromise()) as AllAccountsDataType;
        if (response) {
            const allAccounts = response.data;
            alert(`All Accounts: ${allAccounts[0]?.address}`)
            return allAccounts[0]?.address;
        }
    }

    const getConnectedAccount = async () => {
        const response = (await PluralitySocialConnect.getConnectedAccountPromise()) as ConnectedAccountDataType;
        if (response) {
            const connectedAccount = response.data;
            alert(`Connected Account: ${connectedAccount?.address}`)
            return connectedAccount?.address;
        }
    }

    const getMessageSignature = async (message: string) => {
        const response = (await PluralitySocialConnect.getMessageSignaturePromise(message)) as SignMessageDataType;
        if (response) {
            const signMessage = response.data;
            alert(`Sign Message Data: ${signMessage}`)
            return signMessage;
        }
    }

    const getVerifyMessageData = async (message: string, key: string) => {
        const response = (await PluralitySocialConnect.verifyMessageSignaturePromise(message, key)) as VerifySignedMessageDataType;
        if (response) {
            const verifyMessage = response.data;
            alert(`Verification Signature Data: ${verifyMessage}`)
            return verifyMessage;
        }
    }

    return (

        <div>
            <PluralitySocialConnect options={options} />
            <div style={{
                width: '180px',
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "30px"
            }}>
                <button onClick={() => getAllAccounts()}>Get All Accounts</button>
                <button onClick={() => getConnectedAccount()}>Get Connected Account</button>
                <button onClick={() => getMessageSignature("Example `personal_sign` message.")}>Sign Message</button>
                <button onClick={() => getVerifyMessageData("Example `personal_sign` message.", "0xa1379711716d214c84c146bbaa9d03d77895526b8620bcae67a76f824be6fd3a43795645a31f758eaed39ee6aa5490a979233711d4e9d6a2e30fa09a5e9c808a1b")}>Verify Message</button>

            </div>

        </div>
    )
}

export default Home
