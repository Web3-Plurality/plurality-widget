import React from 'react'
import PluralitySocialConnect from './../plurality-modal/PluralitySocialConnect'
//import PluralitySocialConnect from 'plurality-social-connect'
import { GetBalanceDataType, GetBlockNumberDataType, GetTransactionCountDataType, ReadFromContractDataType, SendTransactionDataType, SwitchNetworkDataType, WriteToContractDataType } from '../types';

const SecondPage = () => {
    const options = { apps: "example", clientId: 'c4034665-9aa0-4e00-91fb-7485477166dc', theme: 'dark' };
    const abi = '[{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"}]';

    const getBalance = async () => {
        const response = (await PluralitySocialConnect.getBalancePromise()) as GetBalanceDataType;
        if (response) {
            const getBalance = response.data;
            alert(`Balance: ${getBalance}`)
            return getBalance;
        }
    }

    const sendTransaction = async (address: string, amount: string) => {
        const response = (await PluralitySocialConnect.sendTransactionPromise(address, amount)) as SendTransactionDataType;
        if (response) {
            const sendTransactionData = response.data;
            alert(`Send Transaction Response: ${sendTransactionData}`)
            return sendTransactionData;
        }
    }

    const getBlockNumber = async () => {
        const response = (await PluralitySocialConnect.getBlockNumberPromise()) as GetBlockNumberDataType;
        if (response) {
            const blockNumber = response.data;
            alert(`Block Number: ${blockNumber}`)
            return blockNumber;
        }
    }

    const getTransactionCount = async (address: string) => {
        const response = (await PluralitySocialConnect.getTransactionCountPromise(address)) as GetTransactionCountDataType;
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

    const writeToContract = async (address: string, abiVal: string, action: string, params: any, rpc: string, chainId: string) => {
        const response = (await PluralitySocialConnect.writeToContractPromise(address, abiVal, action, params, rpc, chainId)) as WriteToContractDataType;
        if (response) {
            const writeContract = response.data;
            alert(`Write To a Contract: ${writeContract}`)
            return writeContract;
        }
    }

    const switchNetwork = async (rpc: string, chainId: string) => {
        const response = (await PluralitySocialConnect.switchNetwork(rpc, chainId)) as SwitchNetworkDataType;
        if (response) {
            const switchNetwork = response.data;
            alert(`Network switched to : ${switchNetwork}`)
            return switchNetwork;
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
                <button onClick={() => getBalance()}>Get Balance</button>
                <button onClick={() => getBlockNumber()}>Get Block Number</button>
                <button onClick={() => sendTransaction("0xe613B4cd69Fe20E8bd0F0D79a264210886bA1AA2", "0.01")}>Send Transaction</button>
                <button onClick={() => getTransactionCount("0xe613B4cd69Fe20E8bd0F0D79a264210886bA1AA2")}>Get Transaction count</button>
                <button onClick={() => readFromContract("0x8E26aa0b6c7A396C92237C6a87cCD6271F67f937", abi, "retrieve", "", "", "")}>Read Contract</button>
                <button onClick={() => writeToContract("0x8E26aa0b6c7A396C92237C6a87cCD6271F67f937", abi, "store", "6", "", "")}>Write Contract</button>
                <button onClick={() => switchNetwork( "https://ethereum-sepolia.rpc.subquery.network/public", "11155111")}>Switch to Sepolia</button>
            </div>

        </div>
    )
}

export default SecondPage
