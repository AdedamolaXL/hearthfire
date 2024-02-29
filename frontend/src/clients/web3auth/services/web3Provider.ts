// import type { IProvider } from "@web3auth/base";
// import Web3 from "web3";
// import { IWalletProvider } from '../services/walletProvider';


// const web3Provider = (provider: IProvider, uiConsole: (...args: unknown[]) => void): IWalletProvider => {
    
//     const getAccounts = async () => {
//       try {
//         const web3 = new Web3(provider);
//         const accounts  = await web3.eth.getAccounts();
//         uiConsole(accounts);
//       } catch (error) {
//         console.error('Error', error);
//         uiConsole('error', error);
//       }
//     };

//         // const getAccounts = async () => {
//         //   try {
//         //     const web3 = new Web3(provider);
//         //     const accounts = await web3.eth.getAccounts();
//         //     return accounts;
//         //     } catch (error) {
//         //     console.error('Error', error);
//         //     throw error;
//         //     }
//         //   };

      

//     const getBalance = async () => {
//       try {
//         const web3 = new Web3(provider);
//         const accounts = await web3.eth.getAccounts();
//         const balance = await web3.eth.getBalance(accounts[0]);
//         uiConsole('Eth balance', balance);
//       } catch (error) {
//         console.error('Error', error);
//         uiConsole('error', error);
//       }
//     };

//     // const getTokenBalance = async () => {
//     //   try {
//     //     const web3 = new Web3(provider);
//     //     const accounts = await web3.eth.getAccounts();
//     //     const contract = new web3.eth.Contract(erc20Abi, tokenAddress);
//     //     const balance = await contract.methods.balanceOf(accounts[0].call());
//     //     uiConsole('Token balance', balance);
//     //   } catch (error) {
//     //     console.error('Error', error);
//     //     uiConsole('error', error);
//     //   }
//     // }

//     const signMessage = async () => {
//       try {
//         const web3 = new Web3(provider);
//         const message = 'Some string';
//         const hash = web3.utils.sha3(message) as string;
//         const fromAddress = (await web3.eth.getAccounts())[0];
//         const sig = await web3.eth.personal.sign(hash, fromAddress, "");
//         uiConsole('personal sign', sig);
//         uiConsole('Eth sign message => true', sig);
//       } catch (error) {
//         console.log('error', error);
//         uiConsole('error', error);
//       }
//     }

//     const signAndSendTransaction = async () => {
//       try {
//         const web3 = new Web3(provider as any);
//         const accounts = await web3.eth.getAccounts();
//         const gasEstimate = await web3.eth.estimateGas({from: accounts[0], to: accounts[0], value: web3.utils.toWei('0.001', 'ether')});
//         const txRes = await web3.eth.sendTransaction({
//           from: accounts[0],
//           to: accounts[0],
//           value: web3.utils.toWei('0.001', 'ether'),
//           gas: gasEstimate,
//         });
//         uiConsole('txRes', txRes);
//       } catch (error) {
//         console.log('error', error);
//         uiConsole('error', error);
//       }
//     };

//     // const signAndSendTokenTransaction = async () => {
//     //   try {
//     //     const web3 = new Web3(provider as any);
//     //     const accounts = await web3.eth.getAccounts();
//     //     const contract = new web3.eth.Contract(erc20Abi, tokenAddress);
//     //     const txRes = await contract.methods
//     //       .transfer("0x3E2a1F4f6b6b5d281Ee9a9B36Bb33F7FBf0614C3", web3.utils.toWei("0.01", "ether"))
//     //       .send({ from: accounts[0] });
//     //     uiConsole('txRes', txRes);
//     //   } catch (error) {
//     //     console.log('error', error);
//     //     uiConsole('error', error);
//     //   }
//     // };

//     // const randomContractInteraction = async () => {
//     //   try {
//     //     const web3 = new Web3(provider as any);
//     //     const accounts = await web3.eth.getAccounts();
//     //     const contract = new web3.eth.Contract(randomContractAbi, "0x04cA407965D60C2B39d892a1DFB1d1d9C30d0334", { dataInputFill: "data" });
//     //     const txRes = await contract.methods.update(`Hello world ${Math.random().toString(36).substring(1, 5)}`).send({ from: accounts[0] });
//     //     uiConsole('txRes', txRes);
//     //   } catch (error) {
//     //     console.log('error', error);
//     //     uiConsole('error', error);
//     //   }
//     // };

//     const signTransaction = async () => {
//       try {
//         const web3 = new Web3(provider as any);
//         const accounts = await web3.eth.getAccounts();
//         const txRes = await web3.eth.signTransaction({
//           from: accounts[0],
//           to: accounts[0],
//           value: web3.utils.toWei('0.001', 'ether'),
//         });
//         uiConsole('txRes', txRes);
//       } catch (error) {
//         console.log('error', error);
//         uiConsole('error', error);
//       }
//     };

//     return {
//       getAccounts,
//       getBalance,
//       signMessage,
//       signAndSendTransaction,
//       //getTokenBalance,
//       // signAndSendTokenTransaction,
//       // randomContractInteraction,
//       signTransaction,
//     };

    




// }

// export default web3Provider;


import type { IProvider } from "@web3auth/base";
import Web3 from "web3";
import { IWalletProvider } from '../services/walletProvider';

const web3Provider = (provider: IProvider, uiConsole: (...args: unknown[]) => void): IWalletProvider => {
    
    const getAccounts = async () => {
        try {
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            
            uiConsole(accounts);
            return await web3.eth.getAccounts();
        } catch (error) {
            console.error('Error', error);
            uiConsole(error);
            throw error;
        }
    };

    const getBalance = async () => {
        try {
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            const balance = await web3.eth.getBalance(accounts[0]);
            
            uiConsole(balance);
            return balance;
        } catch (error) {
            console.error('Error', error);
            uiConsole(error);
            throw error;
        }
    };

    const signMessage = async (): Promise<any> => {
        try {
            const web3 = new Web3(provider);
            const message = 'Some string';
            const hash = web3.utils.sha3(message) as string;
            const fromAddress = (await web3.eth.getAccounts())[0];
            const sig = await web3.eth.personal.sign(hash, fromAddress, "");
            
            uiConsole('personal sign', sig);
            uiConsole('Eth sign message => true', sig);
            return await web3.eth.personal.sign(hash, fromAddress, "");
        } catch (error) {
            console.error('Error', error);
            uiConsole(error);
            throw error;
        }
    };

    const signAndSendTransaction = async (): Promise<any> => {
        try {
            const web3 = new Web3(provider as any);
            const accounts = await web3.eth.getAccounts();
            const gasEstimate = await web3.eth.estimateGas({from: accounts[0], to: accounts[0], value: web3.utils.toWei('0.001', 'ether')});
            const txRes = await web3.eth.sendTransaction({
                from: accounts[0],
                to: accounts[0],
                value: web3.utils.toWei('0.001', 'ether'),
                gas: gasEstimate,
            });
            
            uiConsole('txRes', txRes);
            return txRes;
        } catch (error) {
            console.error('Error', error);
            uiConsole(error);
            throw error;
        }
    };

    const signTransaction = async (): Promise<any> => {
        try {
            const web3 = new Web3(provider as any);
            const accounts = await web3.eth.getAccounts();
            const txRes = await web3.eth.signTransaction({
                from: accounts[0],
                to: accounts[0],
                value: web3.utils.toWei('0.001', 'ether'),
            });
            
            uiConsole('txRes', txRes)
            return txRes;
        } catch (error) {
            console.error('Error', error);
            uiConsole(error)
            throw error;
        }
    };

    return {
        getAccounts,
        getBalance,
        signMessage,
        signAndSendTransaction,
        signTransaction,
    };
};

export default web3Provider;
