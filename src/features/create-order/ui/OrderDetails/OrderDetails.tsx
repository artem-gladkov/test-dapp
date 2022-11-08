import {FC} from 'react'
import classNames from 'classnames'

import styles from './OrderDetails.module.scss'
import {IBaseComponentProps} from "../../../../shared";
import {EOrderType} from "../../types";

export interface IOrderDetailsProps extends IBaseComponentProps {
  pair: { buy: string, sell: string },
  type: string,
  side: string,
  amount: string,
  expectedPrice?: string
}

export const OrderDetails: FC<IOrderDetailsProps> = ({
                                                       className,
                                                       amount,
                                                       expectedPrice,
                                                       side,
                                                       type,
                                                       pair: {buy, sell},
                                                       ...otherProps
                                                     }) => {

  return (
    <div className={classNames(styles.orderDetails, className)}>
      <div className={styles.row}>
        <div className={styles.name}>Trading pair:</div>
        <div className={styles.value}>{buy}/{sell}</div>
      </div>
      <div className={styles.row}>
        <div>Order type:</div>
        <div>{type}</div>
      </div>
      <div className={styles.row}>
        <div>Order side:</div>
        <div>{side}</div>
      </div>
      <div className={styles.row}>
        <div>Asset amount:</div>
        <div>{amount} <span className={styles.secondaryText}>{buy}</span></div>
      </div>
      {type === EOrderType.LIMIT &&
          <div className={styles.row}>
              <div>Expected price:</div>
              <div>{expectedPrice} <span className={styles.secondaryText}>{sell}</span></div>
          </div>
      }
    </div>
  )
}

