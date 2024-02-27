import { MintParamsRequest, MintParamsResponse } from "./types";
import axios from "axios";

const BACKEND_API = "https://api.namespace.tech";

export const generateMintingParams = (
  request: MintParamsRequest
): Promise<MintParamsResponse> => {
  return axios
    .post<MintParamsResponse>(`${BACKEND_API}/api/v1/mint`, request)
    .then((res) => res.data);
};
