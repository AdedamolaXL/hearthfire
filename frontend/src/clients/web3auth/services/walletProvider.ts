import { IProvider } from "@web3auth/base"; 
import web3Provider  from "./web3Provider";

export interface IWalletProvider {
    getAccounts: () => Promise<any>;
    getBalance: () => Promise<any>;
    signAndSendTransaction: () => Promise<void>;
    signTransaction: () => Promise<void>;
    signMessage: () => Promise<void>;
    getTokenBalance?: () => Promise<void>;
    signAndSendTokenTransaction?: () => Promise<void>;
    randomContractInteraction?: () => Promise<void>;
}

export const getWalletProvider =  (chain: string, provider: IProvider, uiConsole: any): IWalletProvider => {
    if (chain === 'calibration') {
        return web3Provider(provider, uiConsole);
    } else if (chain === 'mumbai') {
        return web3Provider(provider, uiConsole);
    }
    return web3Provider(provider, uiConsole);
};