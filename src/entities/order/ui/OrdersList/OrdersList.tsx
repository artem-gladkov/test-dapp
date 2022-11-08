import {FC} from 'react'
import classNames from 'classnames'

import styles from './OrdersList.module.scss'
import {IBaseComponentProps} from "../../../../shared";

export interface IOrdersListProps extends IBaseComponentProps {
}

export const OrdersList: FC<IOrdersListProps> = ({className, ...otherProps}) => {
  return (
    <div className={classNames(styles.order, className)} {...otherProps}>

    </div>
  )
}

