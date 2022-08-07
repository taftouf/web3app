import { Navigate } from "react-router-dom";
import {ethers} from "ethers";
import { useSelector } from "react-redux";

const Private = ({children})=>{
    const address = useSelector((state)=>state.account.address);
    const token = useSelector((state)=>state.account.token_type)+" "+useSelector((state)=>state.account.access_token);
    try {
        if(ethers.utils.isAddress(address) && token.length > 1){
            return children;
        }else{        
            return <Navigate to={"/"} />;
        }
        
    } catch (error) {
        console.log(error);
    }
    
}

export default Private;