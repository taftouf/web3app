import { isAddress } from 'ethers/lib/utils';

let currentAccount = "";
let accessToken = "";
let tokenType = "";
export const Metamaskconnect=async()=>{
    await window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(handleAccountsChanged)
      .catch((err) => {
        if (err.code === 4001) {
          console.log('the user rejected the connection request');
        } else {
          console.error(err);
        }
    });
    if(isAddress(currentAccount)){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: currentAccount })
      };
      await fetch('http://127.0.0.1:8000/api/login', requestOptions)
        .then(response => response.json())
        .then(data => {accessToken = data.access_token; tokenType=data.token_type;});
      
        return{ address:currentAccount, wallet:0, access_token:accessToken, token_type:tokenType };
    }
  }

function handleAccountsChanged(accounts) {
    currentAccount = accounts[0];
  }
