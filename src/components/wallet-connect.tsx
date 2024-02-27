import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { PropsWithChildren } from "react";
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "Namepsace Mint Subname",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, sepolia],
});

const queryClient = new QueryClient();

export const WalletConnect = ({ children }: PropsWithChildren) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        {children}
      </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
