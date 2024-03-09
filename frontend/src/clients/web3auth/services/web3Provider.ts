import type { IProvider } from "@web3auth/base";
import Web3 from "web3";
import { IWalletProvider } from '../services/walletProvider';
import { GoalAddress, GoalAbi } from "@/constants/goaltracker";



const web3Provider = (provider: IProvider, uiConsole: (...args: unknown[]) => void): IWalletProvider => {
  const getAccounts = async () => {
    try {
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      // uiConsole(account);
      return account;
    } catch (error) {
      console.error('Error', error);
      // uiConsole(error);
      throw error;
    }
  };

  const goalContract = async (target: string, stake: number, updates: number, deadline: number) => {
    try {
      const web3 = new Web3(provider as any);
      const accounts = await web3.eth.getAccounts();
    //   const contractAddress = '0xfb802eE16A7FAdEF91cf8e1AEcdf8063C11F3853';
    //   const target = 'Start a goal';
    //   const stake = 3;
    //   const updates = 3;
    //   const deadline = 1710018660;

      const contract = new web3.eth.Contract(GoalAbi, GoalAddress);
      const txRes = await contract.methods.createGoal(target, stake, updates, deadline).send({ from: accounts[0], value: web3.utils.toWei(stake, 'ether')});
      uiConsole('txRes', txRes);
    } catch (error) {
      console.log('error', error);
      uiConsole('error', error)
    }
  }

  return {
    getAccounts,
    goalContract,
  }
};

export default web3Provider;