import { Navigate } from "react-router-dom";
import {ethers} from "ethers";
import { useSelector } from "react-redux";

const Public = ({children})=>{  
    const address = useSelector((state)=>state.account.address);

    if(ethers.utils.isAddress(address)){
        return <Navigate to={"/home"} />;
    }else{ 
        return children;
    }
}

export default Public;