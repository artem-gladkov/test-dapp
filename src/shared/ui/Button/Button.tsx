import {ButtonHTMLAttributes, FC} from 'react'
import classNames from 'classnames'

import styles from './Button.module.scss'
import {Icon} from "../Icon";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: 'primary'
  isFull?: boolean,
  size?: 'small' | 'medium'
  loading?: boolean
  loadingText?: string
}

export const Button: FC<IButtonProps> = ({
                                           className,
                                           children,
                                           buttonType = 'primary',
                                           isFull,
                                           size = 'medium',
                                           disabled,
                                           loading,
                                           loadingText = 'Loading...',
                                           ...otherProps
                                         }) => {
  const classes = classNames(
    styles.button,
    styles[buttonType],
    styles[size],
    {
      [styles.full]: isFull,
      [styles.loading]: loading
    },
    className
  )

  return (
    <button className={classes} disabled={disabled || loading} {...otherProps}>
      <div className={styles.body}>
        <Icon iconType={"spin"} size={20} className={styles.spin}/>
        <span className={styles.main}>{loading ? loadingText : children}</span>
      </div>
    </button>
  )
}

