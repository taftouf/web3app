import * as React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { IntegrationDetails } from "./pages/integrationDetails"
import Private from "./middlewares/private";
import Public from "./middlewares/public";
import { useDispatch } from "react-redux";
import { changeAddress, changeWallet } from "./features/account/accountSlice";
import { Layout } from "./componets/layout";
import { Payments } from "./pages/payment";
import {Integrations} from "./pages/integration";
import connector from "./providers";
import { ethers } from "ethers";

function App() {  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if(window.ethereum){
    window.ethereum.on('accountsChanged', async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      const address = accounts[0];
      await dispatch(changeAddress(address));
      if(accounts[0] === undefined){
        await dispatch(changeWallet(""));
      }
    });
  }

  
  connector.on("disconnect", async(error, payload) => {
    if (error) {
      throw error;
    }
    // change Data
    await dispatch(changeAddress(""));
    await dispatch(changeWallet(""));
    navigate("/");
  });
  
  
  return (
    <Routes>
      <Route path="/" element={<Public> <Login /> </Public>} />
      <Route element={ <Layout />}>
        <Route path="home" element={ <Private> <Home /> </Private>} />
        <Route path="payments" element={ <Private> <Payments /> </Private>} />
        <Route path="integrations" element={ <Private> <Integrations /> </Private>} />
        <Route path="integration" element={ <Private> <IntegrationDetails /> </Private>} />
      </Route>
      
    </Routes>
  );
}

export default App;
