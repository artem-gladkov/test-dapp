import {createSelector, createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {RootState, useAppSelector} from "../../../app/model";
import {EthereumProviderState} from "../types";
import {AVAILABLE_NETWORK} from "../../../shared/config/ethereum-network";

const initialState: EthereumProviderState = {
  provider: undefined,
  networkId: 0
}

//Slice
const ethereumProviderStore = createSlice({
  name: 'ethereumProvider',
  initialState,
  reducers: {
    updateProvider: (state, {payload}) => {
      state.provider = payload
    },
    setNetworkId: (state, {payload}) => {
      state.networkId = payload
    }
  },
})

//Selectors
export const useEthereumProviderStore = () => {
  return useSelector<RootState, EthereumProviderState>(rootState => rootState.ethereumProvider)
}

export const useIsCorrectNetwork = () => {
  return useSelector<RootState, boolean>(rootState => rootState.ethereumProvider.networkId === AVAILABLE_NETWORK)
}

//Actions
export const {updateProvider, setNetworkId} = ethereumProviderStore.actions

//Reducer
export const ethereumProviderReducer = ethereumProviderStore.reducer


