import React, { useState } from 'react'
import { PluralitySocialConnect } from '../plurality-modal'
import { AllAccountsDataType, ConnectedAccountDataType, SignMessageDataType, VerifySignedMessageDataType } from '../plurality-modal'
const Home = () => {
    // const [publicInput, setPublicInput] = useState("")
    const options = { apps: "example", cliendId: '', theme: 'light' };
    
    const getAllAccounts = async () => {
        const response = (await PluralitySocialConnect.getAllAccountsPromise()) as AllAccountsDataType;
        if (response) {
            const allAccounts = response.data;
            alert(`All Accounts: ${allAccounts[0]}`)
            return allAccounts[0]?.address;
        }
    }

    const getConnectedAccount = async () => {
        const response = (await PluralitySocialConnect.getConnectedAccountPromise()) as ConnectedAccountDataType;
        if (response) {
            const connectedAccount = response.data;
            alert(`Connected Account: ${connectedAccount}`)
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

    const getPublicData = async () => {
        const response = (await PluralitySocialConnect.getPublicDataPromise("work")) as ConnectedAccountDataType;
        if (response) {
            // const connectedAccount = response.data;
            console.log("response",response.data)
            // alert(`Connected Account: ${response.data}`)
            // return connectedAccount?.address;
        }
    }

    const setPublicData = async () => {
        const response = (await PluralitySocialConnect.setPublicDataPromise("work","Plurality")) as ConnectedAccountDataType;
        if (response) {
            // const connectedAccount = response.data;
            console.log("response",response.data)
            // alert(`Connected Account: ${response.data}`)
            // return connectedAccount?.address;
        }
    }

    const getPrivateData = async () => {
        const response = (await PluralitySocialConnect.getPrivateDataPromise("work")) as ConnectedAccountDataType;
        if (response) {
            // const connectedAccount = response.data;
            console.log("response",response.data)
            // alert(`Connected Account: ${response.data}`)
            // return connectedAccount?.address;
        }
    }

    const setPrivateData = async () => {
        const response = (await PluralitySocialConnect.setPrivateDataPromise("work","Plurality")) as ConnectedAccountDataType;
        if (response) {
            // const connectedAccount = response.data;
            console.log("response",response.data)
            // alert(`Connected Account: ${response.data}`)
            // return connectedAccount?.address;
        }
    }



    return (

        <div style={{
            padding: "10px"
        }}>
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
                <button onClick={() => getVerifyMessageData("Example `personal_sign` message.", "0x4b0a58d64ef2a4a5b6f60cf0b5f7decfec842e1bca35fba261660770d997297a66dad78ba2b2bd273f7de8130178bc93ddd44be3bafe1a94a8fd81a16a89cb0e1c")}>Verify Message</button>
                <button onClick={() => getPublicData()}>Get Public Data</button>
                <button onClick={() => setPublicData()}>Set Public Data</button>
                <button onClick={() => getPrivateData()}>Get Private Data</button>
                <button onClick={() => setPrivateData()}>Set Private Data</button>


                {/* <input onChange={(e)=>{setPublicInput(e.target.value)}} /> */}
                {/* <button onClick={() => getPublicData()}>Get Public Data</button>
                <button onClick={() => getPublicData()}>Get Public Data</button> */}

            </div>
{/* <input onChange={(e)=>{}}/> */}
        </div>
    )
}

export default Home
