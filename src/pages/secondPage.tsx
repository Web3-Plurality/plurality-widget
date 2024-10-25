import React from 'react'
import PluralitySocialConnect from './../plurality-modal/PluralitySocialConnect.tsx'
import { GetBalanceDataType, GetBlockNumberDataType, GetTransactionCountDataType, ReadFromContractDataType, SendTransactionDataType, WriteToContractDataType } from '../types.ts';

const SecondPage = () => {
    const options = { apps: "example" };
    const abi = '[{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"}]';

    const getBalance = async () => {
        const response = (await PluralitySocialConnect.getBalancePromise()) as GetBalanceDataType;
        const getBalance = response.data;
        alert(`Balance: ${getBalance}`)
        return getBalance;
    }

    const sendTransaction = async (address: string, amount: string) => {
        const response = (await PluralitySocialConnect.sendTransactionPromise(address, amount)) as SendTransactionDataType;
        const sendTransactionData = response.data;
        alert(`Send Transaction Response: ${sendTransactionData}`)
        return sendTransactionData;
    }

    const getBlockNumber = async () => {
        const response = (await PluralitySocialConnect.getBlockNumberPromise()) as GetBlockNumberDataType;
        const blockNumber = response.data;
        alert(`Block Number: ${blockNumber}`)
        return blockNumber;
    }

    const getTransactionCount = async (address: string) => {
        const response = (await PluralitySocialConnect.getTransactionCountPromise(address)) as GetTransactionCountDataType;
        const transactionCount = response.data;
        alert(`Transaction Count: ${transactionCount}`)
        return transactionCount;
    }


    const readFromContract = async (address: string, abiVal: string, action: string) => {
        const response = (await PluralitySocialConnect.readFromContractPromise(address, abiVal, action)) as ReadFromContractDataType;
        const readContract = response.data;
        alert(`Read From Contract Data: ${readContract}`)
        return readContract;
    }

    const writeToContract = async (address: string, abiVal: string, action: string, params: string) => {
        const response = (await PluralitySocialConnect.writeToContractPromise(address, abiVal, action, params)) as WriteToContractDataType;
        const writeContract = response.data;
        alert(`Write To a Contract: ${writeContract}`)
        return writeContract;
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
                <button onClick={() => getBalance()}>Get Balance</button>
                <button onClick={() => getBlockNumber()}>Get Block Number</button>
                <button onClick={() => sendTransaction("0xe613B4cd69Fe20E8bd0F0D79a264210886bA1AA2", "0.01")}>Send Transaction</button>
                <button onClick={() => getTransactionCount("0xe613B4cd69Fe20E8bd0F0D79a264210886bA1AA2")}>Get Transaction count</button>
                <button onClick={() => readFromContract("0xe613B4cd69Fe20E8bd0F0D79a264210886bA1AA2", abi, "retrieve")}>Read Contract</button>
                <button onClick={() => writeToContract("0x8E26aa0b6c7A396C92237C6a87cCD6271F67f937", abi, "store", "5")}>Write Contract</button>
            </div>

        </div>
    )
}

export default SecondPage
