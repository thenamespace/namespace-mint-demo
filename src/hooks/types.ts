import { Address } from "viem";

export type NetworkName = "mainnet" | "sepolia";

export interface GetListingsRequest {
    minterAddress?: Address
    parentLabel?: string
    subnameLabel: string
    network: string
    pageSize: number
}

export interface ListingsResponse {
    parentLabel: string
    parentName: string
    parentNamehash: string
    subnameLabel: string
    mintPrice: number
    listingOwner: Address
    network: NetworkName
}

export interface PaginatedResponse {
    items: ListingsResponse[]
    totalItems: number
}

export interface MintParamsRequest {
    label: string
    parentLabel: string
    subnameOwner: Address,
    resolver?: Address,
    network: NetworkName
}

export interface MintParamsResponse {
    parameters: {
        subnameLabel: string;
        parentNode: string;
        resolver: string;
        subnameOwner: string;
        fuses: number;
        mintPrice: string;
        mintFee: string;
        expiry: number
        ttl: number
      };
      signature: string;
}