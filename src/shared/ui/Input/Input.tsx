import {FC, HTMLProps} from 'react'
import classNames from 'classnames'

import styles from './Input.module.scss'

export interface IInputProps extends HTMLProps<HTMLInputElement> {

}

export const Input: FC<IInputProps> = ({className, readOnly, ...otherProps}) => {
  const classes = classNames(
    styles.input,
    {[styles.readOnly]: readOnly},
    className
  )

  return (
    <input className={classes} readOnly={readOnly} {...otherProps} />
  )
}

