import { WalletConnect } from "./components/wallet-connect";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { EnsThorin } from "./components/ens-thorin";
import { MintForm } from "./components/mint-form";
import { useAccount } from "wagmi";
import "./App.css";

const App = () => {
  return (
    <WalletConnect>
      <EnsThorin>
        <div className="app-container">
          <NamespaceMintDemo />
        </div>
      </EnsThorin>
    </WalletConnect>
  );
};

const NamespaceMintDemo = () => {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <ConnectButton />;
  }

  return <MintForm />;
};

export default App;
