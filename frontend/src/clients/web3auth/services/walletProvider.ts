import { IProvider } from "@web3auth/base"; 
import web3Provider from "./web3Provider";

export interface Goal {
  goalId: number;
  target: any;
  stakeAmount: number;
  updates: number;
  updatesRemaining: number;
  deadline: number;
  completed: any;
  claimed: any;
}


export interface IWalletProvider {
  getAccounts: () => Promise<string>;
  goalContract?: (target: string, stake: number, updates: number, deadline: number) => Promise<void>;
  getGoals?: (owner: string) => Promise<
   Goal[]
  >;
  updateGoals?: (goalId: number, hash: string) => Promise<void>;
  claimStake?: (goalId: number) => Promise<void>;
}

export const getWalletProvider = (chain: string, provider: IProvider, uiConsole: any): IWalletProvider => {
  if (chain === 'calibration') {
    return web3Provider(provider, uiConsole);
  } else if (chain === 'mumbai') {
    return web3Provider(provider, uiConsole);
  }
  return web3Provider(provider, uiConsole);
}