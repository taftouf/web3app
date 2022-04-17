import WalletConnect from "@walletconnect/client";

// Create a connector
const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org", // Required
});
export default connector;