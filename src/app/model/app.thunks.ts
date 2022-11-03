import {AnyAction, createAsyncThunk, ThunkAction} from "@reduxjs/toolkit";
import {checkEthereumConnectionThunk} from "../../entities/ethereum-provider";
import {checkSignerConnectionThunk} from "../../entities/ethereum-signer";
import {AppDispatch} from "./rootStore";


export const initAppThunk = createAsyncThunk(
  'app/init',
  async (_, {dispatch, rejectWithValue}) => {

    try {
      //TODO as
      await dispatch(checkEthereumConnectionThunk as ThunkAction<any, any, any, any>)
      //TODO as
      await dispatch(checkSignerConnectionThunk as ThunkAction<any, any, any, any>)
    } catch (e) {
      return rejectWithValue('Ошибка во время запуска приложения')
    }
  })

