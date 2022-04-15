import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import Private from "./middlewares/private";
import Public from "./middlewares/public";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { changeAddress } from "./features/account/accountSlice";
import { Layout } from "./componets/layout";
import { Payments } from "./pages/payment";
import {Integrations} from "./pages/integration";
function App() {  
  const dispatch = useDispatch();
  if(window.ethereum){
    window.ethereum.on('accountsChanged', async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      const address = accounts[0];
      await dispatch(changeAddress(address))  
    });
    window.ethereum.on('disconnect', async()=>{
      console.log("i m log out from your app");
    });
  }
  
  return (
    <Routes>
      <Route path="/" element={<Public> <Login /> </Public>} />
      <Route element={ <Layout />}>
        <Route path="home" element={ <Private> <Home /> </Private>} />
        <Route path="payments" element={ <Private> <Payments /> </Private>} />
        <Route path="integrations" element={ <Private> <Integrations /> </Private>} />
      </Route>
      
    </Routes>
  );
}

export default App;
