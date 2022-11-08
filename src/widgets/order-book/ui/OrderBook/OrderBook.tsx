import {FC, useEffect, useState} from 'react'
import classNames from 'classnames'

import styles from './OrderBook.module.scss'
import {IBaseComponentProps, Widget} from "../../../../shared";
import {fetchOrders, IOrder, Order} from '../../../../entities/order';
import {IToken} from "../../../../shared/types/i-token";

export interface IOrderBookProps extends IBaseComponentProps {
  aToken?: IToken,
  bToken?: IToken
}

export const OrderBook: FC<IOrderBookProps> = ({
                                                 className,
                                                 aToken,
                                                 bToken,
                                                 ...otherProps
                                               }) => {
  const [ordersList, setOrdersList] = useState<number[]>([1, 2, 3, 4, 5])

  useEffect(() => {
    if(aToken && bToken) {
      fetchOrdersList()
    }

    async function fetchOrdersList() {
      try {
        const orders = await fetchOrders({tokenA: aToken?.address, tokenB: bToken?.address})
        setOrdersList(orders)
      } catch (e) {
        console.log(e)
      }
    }

  }, [aToken, bToken])

  return (
    <div className={classNames(styles.orderBook, className)} {...otherProps}>
      <Widget className={styles.wrapper}>
        <h1>Order Book</h1>
        <div className={styles.listHeader}>
          <div className={styles.firstColumn}>Size {aToken?.symbol}</div>
          <div className={styles.secondColumn}>Price {bToken?.symbol}</div>
        </div>
        <div className={styles.orders}>
          {ordersList.map((num, index) => <Order key={num} price='270' size='115' baseSize='200'/>)}
          <div>Market 120</div>
          {ordersList.map((num, index) => <Order key={num} price='270' size='115' baseSize='200'/>)}
        </div>
      </Widget>
    </div>
  )
}

