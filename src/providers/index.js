import WalletConnectProvider from '@walletconnect/web3-provider';

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "a20f1d0ef34d4f5c84a1d8cead42c105" // required
        }
    },
    // add providers
};

export default providerOptions;