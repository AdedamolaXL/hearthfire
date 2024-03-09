import { Web3 } from 'web3';
import { GoalAbi, GoalAddress } from '@/constants/goaltracker';

export default async function goalContract() {
  const web3 = new Web3('https://filecoin-calibration.chainup.net/rpc/v1');

  try {
    const contract = new web3.eth.Contract(GoalAbi, GoalAddress); 
    return contract;
  } catch (error) {
    console.error('Error fectching contract:', error);
    throw error;
  }
}

