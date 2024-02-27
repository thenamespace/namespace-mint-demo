import { Card, Input, Button, Typography, Spinner } from "@ensdomains/thorin";
import { useAccount } from "wagmi";
import { ListingsResponse, MintParamsRequest, NetworkName } from "../hooks/types";
import { useState } from "react";
import { useNamespaceListings } from "../hooks/use-namespace-listings";
import { generateMintingParams } from "../hooks/generate-minting-params";
import { useNamespaceMinter } from "../hooks/use-subname-minter";

const networkNames: Record<number, NetworkName> = {
  1: "mainnet",
  11155111: "sepolia",
};

export const MintForm = () => {
  const { chain, address } = useAccount();
  const [subnameLabel, setSubnameLabel] = useState("");
  const [parentLabel, setParentLabel] = useState("");
  const [selectedSubname, setSelectedSubname] = useState<ListingsResponse>();
  const { mint } = useNamespaceMinter();
  const [minting, setMinting] = useState(false);
  const networkName = networkNames[chain.id];

  const { items, isFetching } = useNamespaceListings({
    network: networkName,
    subnameLabel: subnameLabel,
    parentLabel: parentLabel,
    minterAddress: address,
    pageSize: 5,
  });

  const handleLabelInput = (value: string) => {
    setSubnameLabel(value);
  };

  const handleParentInput = (value: string) => {
    setParentLabel(value);
  };

  const handleSelectSubname = (data: ListingsResponse) => {
    setSelectedSubname(data);
  };

  const onMint = async () => {
    try {
      setMinting(true);
      const mintRequest: MintParamsRequest = {
        network: networkName,
        parentLabel: selectedSubname.parentLabel,
        label: selectedSubname.subnameLabel,
        subnameOwner: address,
      }
      const mintParams = await generateMintingParams(mintRequest);
      const tx = await mint(mintParams);
      console.log(tx)
    } catch(err) {
      console.log(err.response)
    } finally {
      setMinting(false);
    }
  }

  return (
    <Card className="mint-form">
      <Input
        size="small"
        onChange={(e) => handleParentInput(e.target.value)}
        label="Parent name"
        value={parentLabel}
      ></Input>
      <Input
        size="small"
        onChange={(e) => handleLabelInput(e.target.value)}
        label="Subname label"
        value={subnameLabel}
      ></Input>
      <Card>
        {isFetching && <Spinner></Spinner>}
        {!isFetching &&
          items.map((item) => (
            <MintableSubname
              data={item}
              key={item.parentNamehash}
              onSelect={handleSelectSubname}
            />
          ))}
      </Card>
      {selectedSubname && (
        <Input
          label="Selected subname"
          value={`${selectedSubname.subnameLabel}.${selectedSubname.parentName}`}
        />
      )}
      {selectedSubname && <Button loading={minting} onClick={() => onMint()}>Mint</Button>}
    </Card>
  );
};

const MintableSubname = ({
  data,
  onSelect,
}: {
  data: ListingsResponse;
  onSelect: (data: ListingsResponse) => void;
}) => {
  const { subnameLabel, parentName, mintPrice } = data;

  return (
    <div className="mint-form-subname" onClick={() => onSelect(data)}>
      <Typography>{`${subnameLabel}.${parentName}`}</Typography>
      <Typography>{`Price ${mintPrice} ETH`}</Typography>
    </div>
  );
};
