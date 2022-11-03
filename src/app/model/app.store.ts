import {createSlice} from "@reduxjs/toolkit";
import { initAppThunk } from "./app.thunks";
import {useAppSelector} from "./rootStore";

interface AppInitialState {
  isAppInitialized: boolean
}

const initialState: AppInitialState  = {
  isAppInitialized: false
}

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: {
    [initAppThunk.pending.type]: (state) => {
      state.isAppInitialized = false
    },
    [initAppThunk.fulfilled.type]: (state) => {
      state.isAppInitialized = true
    },
    [initAppThunk.rejected.type]: (state) => {

    },
  }
})

export const useAppState = () => useAppSelector(state => state.app)

export const {} = app.actions
export const appReducer = app.reducer
