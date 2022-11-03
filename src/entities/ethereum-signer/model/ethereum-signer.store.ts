import {AnyAction, AsyncThunkAction, createSlice, ThunkAction} from "@reduxjs/toolkit";
import {JsonRpcSigner} from "@ethersproject/providers";
import {useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../app/model";

interface EthereumSignerState {
  signer: JsonRpcSigner | undefined
}

export const initialState: EthereumSignerState = {
  signer: undefined
}

const ethereumSignerStore = createSlice({
  name: 'ethereumSigner',
  initialState,
  reducers: {
    setSigner: (state: EthereumSignerState, {payload}) => {
      state.signer = payload
    }
  }
})

//Selectors
export const useEthereumSignerStore = () => {
  return useSelector<RootState, EthereumSignerState>(rootState => rootState.ethereumSigner)
}


export const {setSigner} = ethereumSignerStore.actions

export const ethereumSignerReducer = ethereumSignerStore.reducer
