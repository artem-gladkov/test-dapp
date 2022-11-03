import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {ethereumProviderReducer} from "../../entities/ethereum-provider";
import {ethereumSignerReducer} from "../../entities/ethereum-signer";
import { appReducer } from "./app.store";

export const rootStore = configureStore({
  reducer: {
    app: appReducer,
    ethereumProvider: ethereumProviderReducer,
    ethereumSigner: ethereumSignerReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false})
})

export type RootState = ReturnType<typeof rootStore.getState>

export type AppDispatch = typeof rootStore.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
