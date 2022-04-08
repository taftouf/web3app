import { ethers } from 'ethers';
import Web3Modal from "web3modal";
import providerOptions from '../providers';


const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions // required
});
  
const connect = async()=>{
    try {
        await web3Modal.clearCachedProvider();
        const instance = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(instance);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const balance = await signer.getBalance();  
        const chainId = await signer.getChainId();
        return{
                status:"", 
                address:address, 
                chainId:chainId, 
                balance:ethers.utils.formatEther(balance)
            };
         
    } catch (error) {
        console.log(error);
        return{
            status:error,
            address:""
        }
    }
}

export default connect;