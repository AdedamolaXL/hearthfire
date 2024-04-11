'use client'

import React, { useState, useEffect } from 'react';

import { useWeb3Auth } from '@/clients/web3auth/web3auth';


const GetGoals = () => {

  const {
    account,
    goals,
    getGoals, 
    updateGoals,
    claimStake
  } = useWeb3Auth();

  // Call getGoals function when componenet mounts to fetch the goals
  useEffect(() => {
    getGoals(account);
  }, [getGoals, account])

  const [hash, setHash] = useState<string>('');
  const [goalId, setGoalId] = useState<number>(0);


// console.log(goals)


  return (
    <div className='w-full h-[360px] flex-none order-0 flex-grow-0'>
      <h4 className='absolute w-[72px] h-[24px] font-sans font-bold text-[20px] leading-[24px] text-[#FFFFFF]'>
        Goals
      </h4>

      {/* <button className='card' onClick={() => getGoals(account)}>See Current Goals</button> */}
      <div className='absolute w-[680px] h-[288px] top-[400px] flex flex-col items-start p-0 gap-[12px]'>
        {/* Render a card for each goal */}
        {goals.map((goal, index) => (
          <div key={index} className='card'>
            <h3>Goal {index + 1}</h3>
            <p>Target: {goal.target}</p>
            {/* <p>Stake: {goal.stakeAmount}</p>
            <p>Updates: {goal.updates}</p>
            <p>Updates Remaining: {goal.updatesRemaining}</p>
            <p>Deadline: {new Date(goal.deadline * 1000).toLocaleString()} </p>
            <p>Completed: {goal.completed.toString()}</p>
            <p>Claimed: {goal.claimed.toString()}</p> */}

            {/* <div className='flex-container'>
            <button className='card' onClick={() => updateGoals(goalId, hash)}>Submit</button>

  
            {goal.updatesRemaining > 0 && !goal.claimed && (
            <button className='btn'>Claim Stake</button>
            )}
          </div> */}
        </div>
      ))}
      </div> 
    </div>
  )
}



export default GetGoals;