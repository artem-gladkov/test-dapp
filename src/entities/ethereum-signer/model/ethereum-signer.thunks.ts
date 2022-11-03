import {AppDispatch, RootState} from "../../../app/model";
import {setSigner} from "./ethereum-signer.store";

export const connectSignerThunk = async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
  const {ethereumProvider: {provider}} = getState()

  if (!provider) {
    throw ReferenceError('EthereumProvider не существует')
  }

  try {
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner()
    dispatch(setSigner(signer))
  } catch (e) {
    console.log(e)
  }
}

export const checkSignerConnectionThunk = async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
  const {ethereumProvider: { provider }} = getState()
  console.log('checkSignerConnectionThunk')
  if (!provider) {
    throw ReferenceError('EthereumProvider не существует')
  }

  try {
    const [account]: string[] = await provider.listAccounts()

    if (account !== undefined) {
      const signer = provider.getSigner()
      dispatch(setSigner(signer))
    }
  } catch (e) {
    console.log(e)
  }
}
