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
  }, [provider]);

  console.log(account);

  const redirectUrl = account ? `/profile/${account}` : '#';


  return (
    <>
    <section className="absolute w-full h-full left-[0px] top-[120px]">
      <div className='w-[1440px] h-[600px] left-[0px] top-[0px]'>
        <h3 className='absolute w-[878px] h-[108px] left-[835px] top-[170px] font-bold text-[72px] leading-[108px]'>
          CLIMB
        </h3>
        <p className="absolute w-[878px] h-[27px] left-[610px] top-[302px]">
          Do you have a dream project, you have been putting off because you didn't have the time, money or help ?
        </p>
        <p className='absolute w-[1078px] h-[27px] left-[880px] top-[352px]'>
          Well now, you can!. 
        </p>      
        <p className='absolute w-[1078px] h-[27px] left-[610px] top-[400px]'>
          Climb to your goals from 0 - 100. Stack your earnings 0 -100. Find your first 100 people. Start with 1 project.
        </p>  
        <p className='absolute w-[1078px] h-[27px] left-[855px] top-[450px]'>
          It's time to bet on yourself!
        </p> 
      </div>

      <div className="absolute w-[306px] h-[58px] left-[897px] top-[500px]">
        <button className='px-10 py-3.5 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg'>
          <Link className='hover:underline' href={redirectUrl}>
            Sign Up
          </Link>
        </button>
      </div>
      
                                              
 
    </section>
    </>
  )
}

export default Landing;
