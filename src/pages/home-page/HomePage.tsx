import React, {FC} from 'react'

import styles from './HomePage.module.scss'
import {Container, PageLayout} from "../../shared";
import {TradingWidget} from "../../widgets/trading-widget";
import {UserOrders} from "../../widgets/user-orders";
import {OrderBook} from "../../widgets/order-book";

export interface IHomePageProps {
}

export const HomePage: FC<IHomePageProps> = () => {
  return (
    <PageLayout>
      <Container className={styles.container}>
        <div className={styles.body}>
          <main className={styles.main}>
            <TradingWidget/>
            <UserOrders/>
          </main>
          <aside>
            <OrderBook/>
          </aside>
        </div>
      </Container>
    </PageLayout>
  )
}

