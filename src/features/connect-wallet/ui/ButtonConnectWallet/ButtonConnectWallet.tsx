import { FC } from 'react'

import {Button, IBaseComponentProps} from "../../../../shared";
import {useAppDispatch} from "../../../../app/model";
import {connectSignerThunk} from "../../../../entities/ethereum-signer/model/ethereum-signer.thunks";

export interface IButtonConnectWalletProps extends IBaseComponentProps{}

export const ButtonConnectWallet: FC<IButtonConnectWalletProps> = ({className, ...otherProps}) => {
    const dispatch = useAppDispatch()

    const connectWallet = () => {
        dispatch(connectSignerThunk)
        // Проверить сеть
        // Установить соединение
    }

    return (
       <Button onClick={connectWallet}>Connect Wallet</Button>
    )
}

