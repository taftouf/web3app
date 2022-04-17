
let currentAccount = "";

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
      return{ address:currentAccount, wallet:0 };
  }

function handleAccountsChanged(accounts) {
    currentAccount = accounts[0];
  }
