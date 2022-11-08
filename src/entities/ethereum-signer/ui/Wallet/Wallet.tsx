import {FC} from 'react'
import classNames from 'classnames'

import styles from './Wallet.module.scss'
import {IBaseComponentProps, Icon} from "../../../../shared";

export interface IWalletProps extends IBaseComponentProps {
  address: string
}

export const Wallet: FC<IWalletProps> = ({className, address, ...otherProps}) => {
  return (
    <div className={classNames(styles.wallet, className)} {...otherProps}>
      <Icon iconType='metamask'/>
      <div className={styles.address}>{address}</div>
      <button className={styles.buttonUnlink}>
        <Icon iconType="unlink" isInteractive/>
      </button>
    </div>
  )
}

