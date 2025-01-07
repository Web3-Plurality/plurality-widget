import React from 'react'
import PluralitySocialConnect from '@plurality-network/smart-profile-wallet'
//import PluralitySocialConnect from 'plurality-social-connect'
import { GetBalanceDataType, GetBlockNumberDataType, GetTransactionCountDataType, ReadFromContractDataType, SendTransactionDataType, SwitchNetworkDataType, WriteToContractDataType } from '@plurality-network/smart-profile-wallet';
import { ethers } from 'ethers';

const SecondPage = () => {
    const options = { apps: "example", clientId: 'c4034665-9aa0-4e00-91fb-7485477166dc', theme: 'dark' };
    const abi = '[{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
    const rawTx = JSON.stringify({
        to: "0xe613B4cd69Fe20E8bd0F0D79a264210886bA1AA2",
        value: "10000000000000000", //ethers.parseEther("0.01") but keep in string
        gasLimit: "21000", // we need bigInt, so keep it in string
        gasPrice: "50000000000", //ethers.parseUnits("50", "gwei") but keep in string
    })
    const txParams = JSON.stringify([8])
    const txOptions = JSON.stringify({gasLimit: 2000000})
    const getBalance = async (rpc: string, chainId: string) => {
        const response = (await PluralitySocialConnect.getBalancePromise(rpc, chainId)) as GetBalanceDataType;
        if (response) {
            const getBalance = response.data;
            alert(`Balance: ${getBalance}`)
            return getBalance;
        }
    }

    const sendTransaction = async (rawTx: string, rpc: string, chainId: string) => {
        const response = (await PluralitySocialConnect.sendTransactionPromise(rawTx, rpc, chainId)) as SendTransactionDataType;
        if (response) {
            const sendTransactionData = response.data;
            alert(`Send Transaction Response: ${sendTransactionData}`)
            return sendTransactionData;
        }
    }

    const getBlockNumber = async (rpc: string, chainId: string) => {
        const response = (await PluralitySocialConnect.getBlockNumberPromise(rpc, chainId)) as GetBlockNumberDataType;
        if (response) {
            const blockNumber = response.data;
            alert(`Block Number: ${blockNumber}`)
            return blockNumber;
        }
    }

    const getTransactionCount = async (address: string, rpc: string, chainId: string) => {
        const response = (await PluralitySocialConnect.getTransactionCountPromise(address, rpc, chainId)) as GetTransactionCountDataType;
        if (response) {
            const transactionCount = response.data;
            alert(`Transaction Count: ${transactionCount}`)
            return transactionCount;
        }
    }


    const readFromContract = async (address: string, abiVal: string, action: string, params: any, rpc: string, chainId: string) => {
        const response = (await PluralitySocialConnect.readFromContractPromise(address, abiVal, action, params, rpc, chainId)) as ReadFromContractDataType;
        if (response) {
            const readContract = response.data;
            alert(`Read From Contract Data: ${readContract}`)
            return readContract;
        }
    }

    const writeToContract = async (address: string, abiVal: string, action: string, params: any, rpc: string, chainId: string, options: string) => {
        const response = (await PluralitySocialConnect.writeToContractPromise(address, abiVal, action, params, rpc, chainId, options)) as WriteToContractDataType;
        if (response) {
            const writeContract = response.data;
            alert(`Write To a Contract: ${writeContract}`)
            return writeContract;
        }
    }

    // const switchNetwork = async (rpc: string, chainId: string) => {
    //     const response = (await PluralitySocialConnect.switchNetwork(rpc, chainId)) as SwitchNetworkDataType;
    //     if (response) {
    //         const switchNetwork = response.data;
    //         alert(`${switchNetwork}`)
    //         return switchNetwork;
    //     }
    // }

    
    // const fetchNetwork = async () => {
    //     const response = (await PluralitySocialConnect.fetchNetwork()) as SwitchNetworkDataType;
    //     if (response) {
    //         const network = response.data;
    //         alert(`The fetched netwrok is: ${network}`)
    //         return network;
    //     }
    // }

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
                <button onClick={() => getBalance("https://ethereum-sepolia.rpc.subquery.network/public", "11155111")}>Get Balance</button>
                <button onClick={() => getBlockNumber("https://ethereum-sepolia.rpc.subquery.network/public", "11155111")}>Get Block Number</button>
                <button onClick={() => sendTransaction(rawTx, "https://ethereum-sepolia.rpc.subquery.network/public", "11155111")}>Send Transaction</button>
                <button onClick={() => getTransactionCount("0xe613B4cd69Fe20E8bd0F0D79a264210886bA1AA2", "https://ethereum-sepolia.rpc.subquery.network/public", "11155111")}>Get Transaction count</button>
                <button onClick={() => readFromContract("0x8E26aa0b6c7A396C92237C6a87cCD6271F67f937", abi, "retrieve", "", "https://ethereum-sepolia.rpc.subquery.network/public", "11155111")}>Read Contract</button>
                <button onClick={() => writeToContract("0x8E26aa0b6c7A396C92237C6a87cCD6271F67f937", abi, "store", txParams, "https://ethereum-sepolia.rpc.subquery.network/public", "11155111", txOptions)}>Write Contract</button>
                {/* <button onClick={() => switchNetwork( "https://ethereum-sepolia.rpc.subquery.network/public", "11155111")}>Switch to Sepolia</button>
                <button onClick={() => fetchNetwork()}>Fetch the current network</button> */}
            </div>

        </div>
    )
}

export default SecondPage
