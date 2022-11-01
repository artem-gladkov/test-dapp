import {FC,} from 'react'
import classNames from 'classnames'

import styles from './Footer.module.scss'
import {IBaseComponentProps} from "../../../../shared";

export interface IFooterProps extends IBaseComponentProps{}

export const Footer: FC<IFooterProps> = ({className, ...otherProps}) => {
  return (
    <footer className={classNames(styles.footer, className)} {...otherProps}>

    </footer>
  )
}

