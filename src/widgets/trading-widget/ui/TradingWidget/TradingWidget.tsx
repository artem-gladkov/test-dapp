import { FC} from 'react'
import classNames from 'classnames'

import styles from './TradingWidget.module.scss'
import {IBaseComponentProps} from "../../../../shared";

export interface ITradingWidgetProps extends IBaseComponentProps{}

export const TradingWidget: FC<ITradingWidgetProps> = ({className, ...otherProps}) => {
    return (
        <div className={classNames(styles.tradingWidget, className)} {...otherProps}>

        </div>
    )
}

