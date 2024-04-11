import type { IProvider } from "@web3auth/base";
import Web3 from "web3";
import { IWalletProvider } from "./walletProvider";
import { GoalAddress, GoalsAbi } from "@/constants/goaltracker";

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

      const contract = new web3.eth.Contract(GoalsAbi, GoalAddress);
      const txRes = await contract.methods.createGoal(target, stake, updates, deadline).send({ from: accounts[0], value: web3.utils.toWei(stake, 'ether')});
      uiConsole('txRes', txRes);
      console.log(txRes)
    } catch (error) {
      console.log('error', error);
      uiConsole('error', error)
    }
  }

  const getGoals = async (owner: string): Promise<Goal[]> => {
    try {
      const web3 = new Web3(provider as any);
      const accounts = await web3.eth.getAccounts();
      const ownerAccount = accounts[0];
      const contract = new web3.eth.Contract(GoalsAbi, GoalAddress);
      const goals = await contract.methods.getGoalsByOwner(ownerAccount).call();
      
      // Restructure the goals array so it holds the details of each goal individually
      const resGoals: Goal[] = [];
      for (let i = 0; i < goals[0].length; i++) {
        resGoals.push({
          goalId: Number(goals[0][i]), // Convert to number if necessary
          target: goals[1][i],
          stakeAmount: Number(goals[2][i]),
          updates: Number(goals[3][i]),
          updatesRemaining: Number(goals[4][i]),
          deadline: Number(goals[5][i]),
          completed: goals[6][i],
          claimed: goals[7][i],
        });
      }
  
      return resGoals;
    } catch (error) {
      console.log('error', error);
      uiConsole('error', error);
      throw error;
    }
  }
  
  const updateGoals = async (goalId: number, hash: string) => {
    try {
      const web3 = new Web3(provider as any);
      const id = 1;
      const videohash = 'bafybeiam5ph3ckxijghjbwaxc3ilba3qhz4xe3nvirj74wlx2zjfvhw3gy';
      const accounts = await web3.eth.getAccounts();

      const contract = new web3.eth.Contract(GoalsAbi, GoalAddress)
      const update = await contract.methods.updateGoal(id, videohash).send({from: accounts[0]});

      console.log(update);
    } catch (error) {
      console.log('error', error);
      uiConsole('error', error);
      throw error;

    }
  }

  const claimStake = async (goalId: number) => {
    try {
      const web3 = new Web3 (provider as any);
      const id = 1;
      const accounts = await web3.eth.getAccounts();

      const contract = new web3.eth.Contract(GoalsAbi, GoalAddress);
      const claim = await contract.methods.claimStake(id).send({from: accounts[0]});
      console.log(claim);
    } catch (error) {
      console.log('error', error);
      uiConsole('error', error);
      throw error;

    }
  }
      

  return {
    getAccounts,
    goalContract,
    getGoals,
    updateGoals,
    claimStake
  }
};

export default web3Provider;