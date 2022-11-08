import {FC, useCallback, useState} from 'react'
import classNames from 'classnames'

import styles from './TradingWidget.module.scss'
import {IBaseComponentProps, Tabs, Widget} from "../../../../shared";
import {ITabProps} from "../../../../shared/ui/Tabs/Tab";
import {FormCreateOrder} from "../../../../features/create-order/ui/FormCreateOrder/FormCreateOrder";
import {EOrderType} from "../../../../features/create-order";

export interface ITradingWidgetProps extends IBaseComponentProps {
}

const TABS: ITabProps[] = [{
  label: 'Limit',
  key: EOrderType.LIMIT,
}, {
  label: 'Market',
  key:  EOrderType.MARKET,
}]

export const TradingWidget: FC<ITradingWidgetProps> = ({className, ...otherProps}) => {
  const [activeTab, setActiveTab] = useState<EOrderType>(EOrderType.LIMIT)

  const onChangeOrderType = useCallback((value: string) => {
    setActiveTab(value as EOrderType)
  }, [setActiveTab])

  return (
    <div className={classNames(styles.tradingWidget, className)} {...otherProps}>
      <Widget className={styles.widget}>
        <div className={styles.header}>
          <h1>Place the Order</h1>
          <Tabs items={TABS} activeKey={activeTab} onChange={onChangeOrderType}/>
        </div>
        <FormCreateOrder type={activeTab} />
      </Widget>
    </div>
  )
}

