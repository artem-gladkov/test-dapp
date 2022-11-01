import {FC} from 'react'
import classNames from 'classnames'

import {ReactComponent as LogoSvgIcon} from './logo.svg'

import styles from './Logo.module.scss'
import {IBaseComponentProps} from "../../types";

export interface ILogoProps extends IBaseComponentProps {
}

export const Logo: FC<ILogoProps> = ({className, ...otherProps}) => {
  return (
    <div className={classNames(styles.logo, className)} {...otherProps}>
      <LogoSvgIcon />
    </div>
  )
}

