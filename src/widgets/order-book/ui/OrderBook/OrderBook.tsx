import { FC} from 'react'
import classNames from 'classnames'

import styles from './OrderBook.module.scss'
import {IBaseComponentProps} from "../../../../shared";

export interface IOrderBookProps extends IBaseComponentProps {}

export const OrderBook: FC<IOrderBookProps> = ({className, ...otherProps}) => {
    return (
        <div className={classNames(styles.orderBook, className)} {...otherProps}>

        </div>
    )
}

