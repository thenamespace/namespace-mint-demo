import { useEffect } from "react";
import { useState } from "react";
import {
  GetListingsRequest,
  ListingsResponse,
  PaginatedResponse,
} from "./types";
import axios from "axios";

interface NamespaceListingsState {
  items: ListingsResponse[];
  totalItems: number;
  isFetching: boolean;
}

const BACKEND_API = "https://api.namespace.tech";

export const useNamespaceListings = (request: GetListingsRequest) => {
  const [state, setState] = useState<NamespaceListingsState>({
    items: [],
    totalItems: 0,
    isFetching: false,
  });

  useEffect(() => {
    const fetchListings = async (request: GetListingsRequest) => {
      return axios
        .get<PaginatedResponse>(`${BACKEND_API}/api/v1/listings/available`, {
          params: request,
        })
        .then((response) => response.data);
    };

    if (request.subnameLabel.length > 0) {
        setState({
          ...state,
          isFetching: true,
        });
        fetchListings(request)
          .then((apiResponse) => {
            setState({
              items: apiResponse.items,
              totalItems: apiResponse.totalItems,
              isFetching: false,
            });
          })
          .catch((err) => {
            console.error(err.response.data);
            setState({
              ...state,
              isFetching: false,
            });
          });
    }
  }, [request.subnameLabel, request.parentLabel, request.network]);

  return state;
};
