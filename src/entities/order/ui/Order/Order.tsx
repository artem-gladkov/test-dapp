import {FC, HTMLProps} from 'react'
import classNames from 'classnames'

import styles from './Order.module.scss'
import {IBaseComponentProps} from "../../../../shared";

export interface IOrderProps extends IBaseComponentProps {
  price: string,
  size: string
  baseSize?: string
}

export const Order: FC<IOrderProps> = ({className, size, price, ...otherProps}) => {
  const op = size
  return (
    <div className={classNames(styles.order, className)} {...otherProps}>
      <div className={styles.size}>{size}</div>
      <div className={styles.price}>{price}</div>
    </div>
  )
}

