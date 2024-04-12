'use client'

import React, { useState } from 'react';
import { useParams } from "next/navigation";
import Web3 from 'web3';

import { useWeb3Auth } from '@/clients/web3auth/web3auth';

export type Profile = {
  id: string;
}


export type GoalData = {
  target: string;
  stake: number;
  updates: number;
  deadline: number;
}

const GoalForm = () => {
  const [target, setTarget] = useState<string>('');
  const [stake, setStake] = useState<number>(0);
  const [updates, setUpdates] = useState<number>(0);
  const [deadlineT, setDeadlineT] = useState<string>('');

  const {
    goalContract,
  } = useWeb3Auth();

  const deadline = new Date(deadlineT).getTime() / 1000;

  return (
    <div>

      <label>
        What&apos;s your goal?
        <input
          type='text'
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="w-[90%] text-blue placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
        />
      </label>

      <label>
        What do you wanna stake?
        <input
          type='number'
          value={stake}
          onChange={(e) => setStake(Number(e.target.value))}
          className="w-[90%] text-blue placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
        />
      </label>
        
      <label>
        How many updates do you wanna make ?
        <input
            type='number'
            value={updates}
            onChange={(e) => setUpdates(Number(e.target.value))}
            className="w-[90%] text-blue placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
          />
      </label>

      <label>
        What&apos;s your deadline ?
        <input
            type='datetime-local'
            value={deadlineT} 
            onChange={(e) => setDeadlineT(e.target.value)}
            className="w-[90%] text-blue placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
          />
      </label>

      <button onClick={() => goalContract(target, stake, updates, deadline)}>Submit</button>

    </div>
  )
}



export default GoalForm;