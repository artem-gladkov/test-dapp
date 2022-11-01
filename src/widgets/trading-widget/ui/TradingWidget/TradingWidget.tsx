import {FC, useState} from 'react'
import classNames from 'classnames'

import styles from './TradingWidget.module.scss'
import {Button, IBaseComponentProps, Input, Tabs, Toggle, Widget} from "../../../../shared";
import {ITabProps} from "../../../../shared/ui/Tabs/Tab";

export interface ITradingWidgetProps extends IBaseComponentProps {
}

const TABS: ITabProps[] = [{
  label:'Limit',
  key: 'limit',
},{
  label:'Market',
  key: 'market',
}]

export const TradingWidget: FC<ITradingWidgetProps> = ({className, ...otherProps}) => {
  const [checked, setChecked] = useState(false)
  const [activeTab, setActiveTab] = useState('limit')

  return (
    <div className={classNames(styles.tradingWidget, className)} {...otherProps}>
      <Widget className={styles.widget}>
        <div className={styles.header}>
            <h1>Place the Order</h1>
             <Tabs items={TABS} activeKey={activeTab} onChange={setActiveTab}/>
        </div>
        <div className={styles.form}>

        <Toggle
          className={styles.toggle}
          onChange={setChecked}
          checked={checked}
          checkedChildren='Sell'
          unCheckedChildren='Buy'
        />
        <div className={styles.body}>
          <div className={styles.doubleFields}>
            <Input placeholder='Token A smart contract address'/>
            <Input placeholder='Token A amount'/>
          </div>
          <div className={styles.doubleFields}>
            <Input placeholder='Token B smart contract address'/>
            <Input placeholder='Limit price (in Token B)'/>
          </div>
          <Input className={styles.expectedPrice} placeholder='Expected order price' readOnly/>
        </div>
        <Button disabled>
          Place the order
        </Button>
      </div>
      </Widget>
    </div>
  )
}

