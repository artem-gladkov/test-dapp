import {FC} from 'react'
import classNames from 'classnames'

import styles from './UserOrders.module.scss'
import {IBaseComponentProps} from "../../../../shared";

export interface IUserOrdersProps extends IBaseComponentProps {
}

export const UserOrders: FC<IUserOrdersProps> = ({className, ...otherProps}) => {
  return (
    <div className={classNames(styles.userOrders, className)} {...otherProps}>

    </div>
  )
}

