'use client'

import { WALLET_ADAPTERS } from "@web3auth/base";
import { useWeb3Auth } from "@/clients/web3auth/web3auth";

const Landing = () => {
    const {
      provider,
      login,
      logout,
      getUserInfo,
      getAccounts,
      getBalance,
      signMessage,
      signTransaction,
      signAndSendTransaction,
      web3Auth,
      chain,
      addChain,
      switchChain,
      // getTokenBalance,
      // signAndSendTokenTransaction,
      // randomContractInteraction,
      showWalletConnectScanner,
      enableMFA,
    } = useWeb3Auth();

    const loggedInView = (
      <>
      
      <div className="flex-container">
        
        <button onClick={getUserInfo} className="card">
            Get User Info
        </button>
        
        <button onClick={getAccounts} className='card'>
          Get Accounts
        </button>
        
        <button onClick={getBalance} className='card'>
          Get Balance
        </button>

        {/* <button onClick={getTokenBalance} className={styles.card}>
          Get Token Balance
        </button> */}
      
        <button onClick={signMessage} className='card'>
          Sign Message
        </button>
        
        <button onClick={addChain} className='card'>
          Add Chain
        </button>
      
        <button onClick={switchChain} className='card'>
          Switch Chain
        </button>
        
        <button onClick={enableMFA} className='card'>
          Enable MFA
        </button>
        
        {(web3Auth?.connectedAdapterName === WALLET_ADAPTERS.OPENLOGIN || chain === "calibration") && (
        
        <button onClick={signTransaction} className='card'>
          Sign Transaction
        </button>
        
        )}
      
        <button onClick={signAndSendTransaction} className='card'>
          Sign and Send Transaction
        </button>
        
        {/* <button onClick={signAndSendTokenTransaction} className={styles.card}>
          Sign and Send Token Transaction
        </button>
        
        <button onClick={randomContractInteraction} className={styles.card}>
          Contract Interaction
        </button> */}
        
        <button onClick={showWalletConnectScanner} className='card'>
          Show WalletConnect Scanner
        </button>
        
        <button onClick={logout} className='card'>
          Log Out
        </button>
                
        <div id="console" style={{ whiteSpace: "pre-line" }}>
          <p style={{ whiteSpace: "pre-line"}}></p>
        </div>
      
      </div>
      
      </>
    )

    const unloggedInView = (
        <button onClick={login} className='card'>
            Login
        </button>
    );


  return (
    <>
      <section className="relative bg-black flex flex-col h-screen justify-center items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="text-center pb-12 md:pb-16">   

          <h1 className="text-5xl text-white md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" 
                data-aos="zoom-y-0ut"
          >   
            {/* It's Youtube, but {" "} */}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-400">
            Hearthfire</span>
          </h1>
        
        <div className='max-w-3xl mx-auto'>
            <p
              className="text-xl text-gray-400 mb-8"
              data-aos="zoom-y-out"
              data-aos-delay="150"
            >
            Plant a goal. Grow with it. Earn with it.
            </p>
        </div>

        <div className="grid">{provider ? loggedInView : unloggedInView}</div>
        
        </div>
        </div>
        </div>
    </section>

    
    </>
  )
  
  
  
}

export default Landing