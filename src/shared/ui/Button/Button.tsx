import {ButtonHTMLAttributes, FC} from 'react'
import classNames from 'classnames'

import styles from './Button.module.scss'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: 'primary'
  isFull?: boolean
}

export const Button: FC<IButtonProps> = ({
                                           className,
                                           children,
                                           buttonType = 'primary',
                                           isFull,
                                           ...otherProps
                                         }) => {
  const classes = classNames(
    styles.button,
    styles[buttonType],
    {[styles.full]: isFull},
    className
  )

  return (
    <button className={classes} {...otherProps}>
      {children}
    </button>
  )
}

