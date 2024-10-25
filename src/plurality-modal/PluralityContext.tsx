/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useContext, ReactNode } from 'react';
import PluralitySocialConnect from './PluralitySocialConnect';

interface PluralityContextType {
    awaitGetAllAccounts: () => Promise<unknown>;
    awaitGetConnectedAccount: () => Promise<unknown>
    awaitGetMessageSignature: (message: string) => Promise<unknown>
    awaitVerifyMessageSignature: (message: string, address: string) => Promise<unknown>
    awaitGetBalanace: () => Promise<unknown>
    awaitSendTransaction: (address: string, amount: string) => Promise<unknown>
    awaitGetBlockNumber: () => Promise<unknown>
    awaitGetTransactionCount: (address: string) => Promise<unknown>
    awaitReadFromContract: (address: string, abi: string, type: string) => Promise<unknown>
    awaitWriteToContract: (address: string, abi: string, type: string, params: string) => Promise<unknown>
}

const PluralityContext = createContext<PluralityContextType | null>(null);

export const PluralityProvider = ({ children }: { children: ReactNode }) => {

    const awaitGetAllAccounts = async () => {
        const resp = await PluralitySocialConnect.getAllAccountsPromise();
        return resp;
    }

    const awaitGetConnectedAccount = async () => {
        const resp = await PluralitySocialConnect.getConnectedAccountPromise();
        return resp
    };

    const awaitGetBalanace = async () => {
        const resp = await PluralitySocialConnect.getBalancePromise();
        return resp
    };

    const awaitGetMessageSignature = async (messageToSign: string) => {
        const resp = await PluralitySocialConnect.getMessageSignaturePromise(messageToSign);
        return resp
    };

    const awaitVerifyMessageSignature = async (messageToVeify: string, abi: string) => {
        const resp = await PluralitySocialConnect.verifyMessageSignaturePromise(messageToVeify, abi);
        return resp;
    };

    const awaitSendTransaction = async (address: string, amount: string) => {
        const resp = await PluralitySocialConnect.sendTransactionPromise(address, amount);
        return resp;
    };

    const awaitGetBlockNumber = async () => {
        const resp = await PluralitySocialConnect.getBlockNumberPromise();
        return resp;
    };

    const awaitGetTransactionCount = async (address: string) => {
        const resp = await PluralitySocialConnect.getTransactionCountPromise(address);
        return resp
    };

    const awaitReadFromContract = async (address: string, abi: string, type: string) => {
        const resp = await PluralitySocialConnect.readFromContractPromise(address, abi, type);
        return resp
    };

    const awaitWriteToContract = async (address: string, abi: string, type: string, params: string) => {
        const resp = await PluralitySocialConnect.writeToContractPromise(address, abi, type, params);
        return resp
    };

    return (
        <PluralityContext.Provider value={{
            awaitGetAllAccounts,
            awaitGetConnectedAccount,
            awaitGetMessageSignature,
            awaitVerifyMessageSignature,
            awaitGetBalanace,
            awaitSendTransaction,
            awaitGetBlockNumber,
            awaitGetTransactionCount,
            awaitReadFromContract,
            awaitWriteToContract
        }}>
            {children}
        </PluralityContext.Provider>
    );
};

export const usePlurality = () => useContext(PluralityContext);