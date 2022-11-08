import {FC} from 'react'
import classNames from 'classnames'

import styles from './Loader.module.scss'
import {IBaseComponentProps} from "../../types";
import {Icon} from "../Icon";

export interface ILoaderProps extends IBaseComponentProps {
  text?: string,
  mask?: boolean
}

export const Loader: FC<ILoaderProps> = ({className, text = 'Загрузка ...', mask = false, ...otherProps}) => {
  const classes = classNames(styles.loader, {[styles.mask]: mask}, className)

  return (
    <div className={classes} {...otherProps}>
      <div className={styles.body}>
        <Icon iconType='spin' className={styles.spin}/>
        <div className={styles.text}>
          {text}
        </div>
      </div>
    </div>
  )
}

