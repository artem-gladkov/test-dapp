import {FC} from 'react'
import classNames from 'classnames'

import styles from './Icon.module.scss'
import {IBaseComponentProps} from "../../types";
import {IconsArray} from './icons'

export type IconType = keyof typeof IconsArray;

export interface IIconProps extends IBaseComponentProps {
  iconType: IconType
  size?: number
  isInteractive?: boolean
}

export const Icon: FC<IIconProps> = ({className, size = 20, iconType, isInteractive, ...otherProps}) => {
  const IconRender = IconsArray[iconType]

  const classes = classNames(
    styles.icon,
    {[styles.interactive]: isInteractive},
    className
  )

  return (
    <div className={classes} style={{width: size, height: size}} {...otherProps}>
      <IconRender/>
    </div>
  )
}

