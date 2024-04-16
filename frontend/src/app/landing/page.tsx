'use client'

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useWeb3Auth } from "@/clients/web3auth/web3auth";

const Landing = () => {
  const [account, setAccount] = useState('');
  const { web3Auth, provider, login, logout, getAccounts } = useWeb3Auth();

  useEffect(() => {
    if (web3Auth) {
        web3Auth.connect();
    }
  }, [web3Auth]);

  useEffect(() => {
    if (provider) {
    getAccounts().then(fetchedAccount => 
    setAccount(fetchedAccount)).catch(error => 
    console.error('Error fetching accounts', error));
    }
  }, [provider, getAccounts]);

  console.log(account);

  const redirectUrl = account ? `/profile/${account}` : '#';


  return (
    <>
    <section className="py-28 relative bg-blue-600">
      <div className='relative z-10 max-w-screen-xl mx-auto px-4 md:text-center md:px-8'>
      <div className='max-w-xl md:mx-auto'>

        <h3 className='text-white text-3xl font-semibold sm:text-4xl'>
          CLIMB
        </h3>

        <p className="text-blue-100 mt-3">
          Do you have a project, you have been putting off because you didn&apos;t have, the time, the money or help ?
        </p>
        <p className='text-blue-100 mt-3'>
          Well now.. ..you can build it! 
        </p>    
        <p className='text-blue-100 mt-3'>
          Climb towards your goal. Stack your earnings. Find your people. 
        </p>
        <p className='text-blue-100 mt-3'>
          It's about time you bet on your self!
        </p>
        <p className='text-blue-100 mt-3'>
          Sign up and start your dream project here..
        </p>

      </div>
        
      <div className="mt-4">
        <button className='inline-block py-2 px-4 text-gray-800 font-medium bg-white duration-150 hover:bg-gray-100 active:bg-gray-200 rounded-full'>
          <Link className='hover:underline' href={redirectUrl}>
            Sign Up
          </Link>
        </button>
      </div>

      </div>
      <div className="absolute top-0 w-full h-full" 
        style={{ background: "linear-gradient(268.24deg, rgba(59, 130, 246, 0.76) 50%, rgba(59, 130, 246, 0.545528) 80.61%, rgba(55, 48, 163, 0) 117.35%)" }}>
      </div>
    </section>
    </>
  )
}

export default Landing;
