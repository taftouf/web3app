import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import Private from "./middlewares/private";
import Public from "./middlewares/public";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { changeAddress } from "./features/account/accountSlice";

function App() {  
  const dispatch = useDispatch();
  if(window.ethereum){
    window.ethereum.on('accountsChanged', async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      const address = accounts[0];
      await dispatch(changeAddress(address))  
    });
  }
  
  return (
    <Routes>
      <Route path="/" element={<Public> <Login /> </Public>} />
      <Route path="home" element={ <Private> <Home /> </Private>} />
    </Routes>
  );
}

export default App;
