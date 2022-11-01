import React from 'react';
import {Footer} from './widgets/footer';
import {Header} from "./widgets/header";
import {TradingWidget} from "./widgets/trading-widget";
import {UserOrders} from "./widgets/user-orders";
import {OrderBook} from "./widgets/order-book";

function App() {
  return (
    <div>
      <Header/>
      <main>
        <TradingWidget/>
        <UserOrders/>
      </main>
      <aside>
        <OrderBook/>
      </aside>
      <Footer/>
    </div>
  );
}

export default App;
