import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { MintParamsResponse } from "./types";
import ABI from "./abi/namespace-minter-abi.json";

const minterAddresses = {
  1: "0x18cC184E630A8290e46082351ba66A209a0787ba",
  11155111: "0x2674E4FAe872780F01B99e109E67749B765703fB",
};

export const useNamespaceMinter = () => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { chain, address } = useAccount();

  const mint = async (mintParams: MintParamsResponse) => {
    const { parameters, signature } = mintParams;
    const {
      expiry,
      fuses,
      mintFee,
      mintPrice,
      parentNode,
      resolver,
      subnameLabel,
      subnameOwner,
      ttl,
    } = parameters;

    const mintFeeWei = BigInt(mintFee);
    const mintPriceWei = BigInt(mintPrice);
    const totalPrice = mintFeeWei + mintPriceWei;

    const { request } = await publicClient.simulateContract({
      abi: ABI,
      functionName: "mint",
      address: minterAddresses[chain.id],
      account: address,
      args: [
        {
          expiry,
          fuses,
          parentNode,
          resolver,
          subnameLabel,
          subnameOwner,
          ttl,
          mintFee: mintFeeWei,
          mintPrice: mintPriceWei,
        },
        signature,
      ],
      value: totalPrice,
    });
    return walletClient.writeContract(request);
  };

  return {
    mint
  }
};
