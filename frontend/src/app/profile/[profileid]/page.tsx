'use client'

import React, {useEffect, useState} from 'react';
import Image from "next/image";

import { useParams } from "next/navigation";
import GoalForm from './section/GoalForm';
import GetGoals from './section/GoalDetails';

export type Profile = {
  id: string;
}

const Profile = () => {
  const params = useParams();
  const profileid = params.profileid;
  
  const [activeTab, setActiveTab] = useState('stats');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  }

  return (
    <>
    <main className='absolute bg-[#191414] w-full h-[1024px]'>
      <div className='h-[944px] top-0 p-0 gap-[16px] flex flex-col justify-center items-center'>
        <section className='bg-gradient-to-t from-slate-500 to-gray-800 h-[300px] block flex-none order-0 flex-grow-0 top-0 left-0 opacity-1.5'>
          <Image
            alt="Profile Picture"
            className="absolute left-[28px] top-[108px] rounded-full ring-8 shadow-[0_8px_16px_-8px_rgba(25, 20, 20, 0.8)]"
            height={160}
            src="/riyo.png"
            style={{
            aspectRatio: "160/160",
            objectFit: "cover",
            }}
            width={160}
          />
          <div className='absolute w-[484px] h-[138px] left-[204px] top-[120px]'>
            <h1 className='h-[96px] text-white text-[80px] leading-[96px] font-black pb-10'>
              Riyo Amobi
            </h1>
            <div className='w-[95px] h-[16px] flex flex-row items-center p-0 gap-[4px]'>
              <h6 className='w-[75px] h-[14px] text-white text-[12px] leading-[14px] font-normal flex-none order-1 flex-grow-0 uppercase'>
                Designer
              </h6>
            </div>
            <div className='w-[143px] h[-14px] top-[244px] p-0 gap-[2px] flex flex-row items-start'>
              <h6 className='w-[48px] h-[14px] text-white font-normal text-[12px] leading-[14px] flex-none order-0 flex-grow-0'>
                {profileid}
              </h6>
            </div>
           
          </div>
        </section>

        <div className='bg-yellow-300 w-full h-[628px] flex flex-col items-start p-0 gap-[24px] flex-none order-1 flex-grow-0'>
          <section className='bg-[#aaaaaa] w-full h-[66px] flex flex-row items-center p-0 gap-[24px] flex-none order-0 flex-grow-0'>
            <button
              className={`mr-4 p-2 rounded ${
                activeTab === 'stats' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => handleTabChange('stats')}
              >
              Stats
            </button>
            <button
              className={`p-2 rounded ${
                activeTab === 'goals' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => handleTabChange('goals')}
              >
              Goals
            </button>
          </section>
          
           {/* Content based on Active Tab */}
      {activeTab === 'stats' ? (
        <div>
          {/* Stats Section */}
          <div className="mb-8">
            <GoalForm />
          </div>
        </div>
      ) : (
        <div>
          {/* Goals Section */}
          <div className="mb-8">
            <GetGoals />
          </div>
        </div>
      )}

        </div>
      </div>
    </main>
    </>  
  )
}

 
export default Profile;