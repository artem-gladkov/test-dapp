import {createSlice} from "@reduxjs/toolkit";
import {Web3Provider} from "@ethersproject/providers";
import {useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../app/model";
import {AVAILABLE_NETWORK} from "../../../shared/config/ethereum-network";

//Types
interface EthereumProviderState {
  provider: Web3Provider | undefined
}

const initialState: EthereumProviderState = {
  provider: undefined
}

//Slice
const ethereumProviderStore = createSlice({
  name: 'ethereumProvider',
  initialState,
  reducers: {
    updateProvider: (state, {payload}) => {
      state.provider = payload
    }
  },
})

//Thunks
export const checkEthereumConnectionThunk = async (dispatch: AppDispatch): Promise<void> => {
  try {
    if(window.ethereum) {
      const provider = new Web3Provider(window.ethereum, AVAILABLE_NETWORK)
      dispatch(updateProvider(provider))
    }
  } catch (e) {
    console.log(e)
  }
}

//Selectors
export const useEthereumProviderStore = () => {
  return useSelector<RootState, EthereumProviderState>(rootState => rootState.ethereumProvider)
}

//Actions
export const {updateProvider} = ethereumProviderStore.actions

//Reducer
export const ethereumProviderReducer = ethereumProviderStore.reducer


