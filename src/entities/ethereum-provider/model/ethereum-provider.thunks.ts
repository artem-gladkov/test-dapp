import {AppDispatch, RootState} from "../../../app/model";
import {Web3Provider} from "@ethersproject/providers";
import {AVAILABLE_NETWORK} from "../../../shared/config/ethereum-network";
import {setNetworkId, updateProvider} from "./ethereum-provider.store";
import {Modal} from "../../../shared";

export const checkEthereumConnectionThunk = async (dispatch: AppDispatch): Promise<void> => {
  try {
    if (window.ethereum) {
      const provider = new Web3Provider(window.ethereum, 'any')
      dispatch(updateProvider(provider))
    }
  } catch (e) {
    console.log(e)
  }
}

export const checkNetworkThunk = async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
  const {ethereumProvider: {provider}} = getState()

  if (!provider) {
    throw ReferenceError('Нет подключения к ethereum. Provider не существует')
  }

  try {
    const {chainId} = await provider.getNetwork()
    dispatch(setNetworkId(chainId))
  } catch (e) {
    console.log(e)
  }
}

export const changeToAvailableNetworkThunk = async (dispatch: AppDispatch, getState: () => RootState): Promise<boolean> => {
  const {ethereumProvider: {provider}} = getState()

  if (!provider) {
    throw ReferenceError('Нет подключения к ethereum. Provider не существует')
  }

  try {
    const result = await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{chainId: `0x${AVAILABLE_NETWORK.toString(16)}`}]
    })

    if (!result) {
      const {chainId} = await provider.getNetwork()
      dispatch(setNetworkId(chainId))
      return true
    }

    return false
  } catch (e) {
    Modal.info({
      mask: true,
      title: 'Wrong Network',
      text: 'Wrong network, please, select Ethereum Limit price (in Token B) blockchain.'
    })

    return false
  }
}


