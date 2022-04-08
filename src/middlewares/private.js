import { Navigate } from "react-router-dom";
import {ethers} from "ethers";
import { useSelector } from "react-redux";


const Private = ({children})=>{
    const address = useSelector((state)=>state.account.address);

    if(ethers.utils.isAddress(address)){
        return children;
    }else{        
        return <Navigate to={"/"} />;
    }
}

export default Private;