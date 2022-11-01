import {FC, useState} from 'react'
import classNames from 'classnames'

import styles from './UserOrders.module.scss'
import {IBaseComponentProps, Widget} from "../../../../shared";

export interface IUserOrdersProps extends IBaseComponentProps {
}

export const UserOrders: FC<IUserOrdersProps> = ({className, ...otherProps}) => {
  const [isEmpty] = useState(true)

  return (
    <div className={classNames(styles.userOrders, className)} {...otherProps}>
      <Widget>
        <div className={styles.body}>
        <h1>My Orders</h1>
        {isEmpty ? <p className={styles.emptyText}>Connect your wallet to start trading</p> : <div>Ордера</div>}
        </div>
      </Widget>
    </div>
  )
}

