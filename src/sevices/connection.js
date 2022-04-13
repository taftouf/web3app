import { ethers } from 'ethers';
import Web3Modal from "web3modal";
import providerOptions from '../providers';


const web3Modal = new Web3Modal({
    // network: "mainnet", // optional
    cacheProvider: true, // optional
    disableInjectedProvider: true ,
    providerOptions // required
});
  
export const _walletconnect = async(n)=>{
    try {
        await web3Modal.clearCachedProvider();
        var instance = window.ethereum;
        if(n === 1)
        {
            instance = await web3Modal.connect();
        }else
        {
            await window.ethereum.request({
                method: "eth_requestAccounts",
            });
        }
        const provider = new ethers.providers.Web3Provider(instance);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        return{ address:addr, err:"" };
        
    } catch (error) {
        return { address:"", err:error };
    }
}

