import {createAsyncThunk} from "@reduxjs/toolkit";
import {checkEthereumConnectionThunk, checkNetworkThunk} from "../../entities/ethereum-provider";
import {checkSignerConnectionThunk} from "../../entities/ethereum-signer";

export const initAppThunk = createAsyncThunk(
  'app/init',
  async (_, {dispatch, rejectWithValue}) => {

    try {
      //@ts-ignore TODO
      await dispatch(checkEthereumConnectionThunk)
      //@ts-ignore TODO
      await dispatch(checkNetworkThunk)
      //@ts-ignore TODO
      await dispatch(checkSignerConnectionThunk)
    } catch (e) {
      return rejectWithValue('Ошибка во время запуска приложения')
    }
  })

