import React, {useEffect} from 'react';
import {HomePage} from "../pages/home-page";
import {useAppDispatch} from "./model";
import {initAppThunk} from './model/app.thunks';
import {useAppState} from "./model/app.store";
import { Loader } from '../shared';

export const App = () => {
  const dispatch = useAppDispatch()
  const {isAppInitialized} = useAppState()

  useEffect(() => {
    dispatch(initAppThunk())
  }, [])

  return (
    isAppInitialized
      ? <HomePage/>
      : <Loader/>
  )
}
