import { Navigate } from "react-router-dom";
import {ethers} from "ethers";
import { useSelector } from "react-redux";

const Public = ({children})=>{  
    const address = useSelector((state)=>state.account.address);
    try {
        if(ethers.utils.isAddress(address)){
            return <Navigate to={"/home"} />;
        }else{ 
            return children;
        }
    } catch (error) {
        console.log(error);
    }
}

export default Public;