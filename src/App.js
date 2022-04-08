import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import Private from "./middlewares/private";
import Public from "./middlewares/public";

function App() {  

  return (
    <Routes>
      <Route path="/" element={<Public> <Login /> </Public>} />
      <Route path="home" element={ <Private> <Home /> </Private>} />
    </Routes>
  );
}

export default App;
