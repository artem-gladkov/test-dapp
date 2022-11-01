import { FC, useCallback} from 'react'
import classNames from 'classnames'

import styles from './Tabs.module.scss'
import {IBaseComponentProps} from "../../types";
import {ITabProps, Tab} from "./Tab";

export interface ITabsProps extends IBaseComponentProps {
  activeKey: string
  onChange: (newActiveKey: string) => void
  items: ITabProps[]
}

export const Tabs: FC<ITabsProps> = ({className, items, activeKey, onChange}) => {
  const onClickTabCreator = useCallback(({disabled, key}: ITabProps) => () => {
    if (!disabled) {
      onChange(key)
    }
  }, [onChange])

  return (
    <div className={classNames(styles.tabs, className)}>
      {items.map(({key, ...restTabProps}) =>
        <Tab
          key={key}
          active={key === activeKey}
          className={styles.tab}
          {...restTabProps}
          onClick={onClickTabCreator({key, ...restTabProps})}
        />
      )}
    </div>
  )
}

