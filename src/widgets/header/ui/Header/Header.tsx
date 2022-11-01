import {FC} from 'react'
import classNames from 'classnames'

import styles from './Header.module.scss'
import {IBaseComponentProps, Logo} from "../../../../shared";

export interface IHeaderProps extends IBaseComponentProps{
}

export const Header: FC<IHeaderProps> = ({className, ...otherProps}) => {
  return (
    <header className={classNames(styles.header, className)} {...otherProps}>
      <Logo />
    </header>
  )
}

