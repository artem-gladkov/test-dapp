import {FC, useCallback, useState} from 'react'

import {Button, IBaseComponentProps} from "../../../../shared";
import {useAppDispatch} from "../../../../app/model";
import {connectSignerThunk} from "../../../../entities/ethereum-signer";
import {
  changeToAvailableNetworkThunk,
  useIsCorrectNetwork
} from "../../../../entities/ethereum-provider";

export interface IButtonConnectWalletProps extends IBaseComponentProps {
}

export const ButtonConnectWallet: FC<IButtonConnectWalletProps> = ({className}) => {
  const dispatch = useAppDispatch()
  const isCorrectNetwork = useIsCorrectNetwork()
  const [loading, setLoading] = useState(false)

  const connectWallet = async () => {
    setLoading(true)

    if (!isCorrectNetwork) {
      const isSuccess = await dispatch(changeToAvailableNetworkThunk)
      if (isSuccess) {
        await dispatch(connectSignerThunk)
      }
    } else {
      await dispatch(connectSignerThunk)
    }

    setLoading(false)
  }

  return (
    <Button onClick={connectWallet} size='medium' loadingText='Connecting...' loading={loading}>Connect Wallet</Button>
  )
}

