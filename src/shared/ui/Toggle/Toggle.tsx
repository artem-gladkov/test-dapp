import {ChangeEvent, FC, ReactNode} from 'react'
import classNames from 'classnames'

import styles from './Toggle.module.scss'
import {IBaseComponentProps} from "../../types";

export interface IToggleProps extends IBaseComponentProps {
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void
  checked?: boolean;
  checkedChildren?: ReactNode;
  unCheckedChildren?: ReactNode;
  isFull?: boolean
}

export const Toggle: FC<IToggleProps> = ({
  className,
  onChange,
  checkedChildren,
  unCheckedChildren,
  checked,
  isFull,
  ...otherProps
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.currentTarget.checked, event)
  }

  return (
    <label className={classNames(styles.toggle, {[styles.full]: isFull}, className)} {...otherProps}>
      <div className={styles.wrapper}>
        <input className={styles.input} onChange={handleChange} type='checkbox' checked={checked}/>
        <div className={styles.activeBg}/>
        <div className={classNames(styles.children, {[styles.active]: !checked})}>{unCheckedChildren}</div>
        <div className={classNames(styles.children, {[styles.active]: checked})}>{checkedChildren}</div>
      </div>
    </label>
  )
}

