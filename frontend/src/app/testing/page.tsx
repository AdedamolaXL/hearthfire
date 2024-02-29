'use client'

import { WALLET_ADAPTERS } from "@web3auth/base";
import { useWeb3Auth } from "@/clients/web3auth/web3auth";


const Main = () => {
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
      <button onClick={getUserInfo}>
        Get User Info
      </button>
      <button onClick={getAccounts}>
        Get Accounts
      </button>
      <button onClick={getBalance}>
        Get Balance
      </button>
      {/* <button onClick={getTokenBalance} className={styles.card}>
        Get Token Balance
      </button> */}
      <button onClick={signMessage}>
        Sign Message
      </button>
      <button onClick={addChain}>
        Add Chain
      </button>
      <button onClick={switchChain}>
        Switch Chain
      </button>
      <button onClick={enableMFA}>
        Enable MFA
      </button>
      {(web3Auth?.connectedAdapterName === WALLET_ADAPTERS.OPENLOGIN || chain === "calibration") && (
        <button onClick={signTransaction}>
          Sign Transaction
        </button>
      )}
      <button onClick={signAndSendTransaction}>
        Sign and Send Transaction
      </button>
      {/* <button onClick={signAndSendTokenTransaction} className={styles.card}>
        Sign and Send Token Transaction
      </button>
      <button onClick={randomContractInteraction} className={styles.card}>
        Contract Interaction
      </button> */}
      <button onClick={showWalletConnectScanner}>
        Show WalletConnect Scanner
      </button>
      <button onClick={logout}>
        Log Out
      </button>

      <div id="console">
        <p></p>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login}>
      Login
    </button>
  );

  return <div>{provider ? loggedInView : unloggedInView}</div>;
};

export default Main;