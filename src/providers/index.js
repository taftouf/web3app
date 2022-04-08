import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import WalletConnectProvider from '@walletconnect/web3-provider';

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "a20f1d0ef34d4f5c84a1d8cead42c105" // required
        }
    },
    coinbasewallet: {
        package: CoinbaseWalletSDK, // Required
        options: {
        appName: "x_pay", // Required
        infuraId: "a20f1d0ef34d4f5c84a1d8cead42c105", // Required
        rpc: "", // Optional if `infuraId` is provided; otherwise it's required
        chainId: 1, // Optional. It defaults to 1 if not provided
        darkMode: true // Optional. Use dark theme, defaults to false
        }
    },
    binancechainwallet: {
        package: true
    },
};

export default providerOptions;