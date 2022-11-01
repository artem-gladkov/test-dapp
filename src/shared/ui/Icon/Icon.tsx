import {FC} from 'react'
import classNames from 'classnames'

import styles from './Icon.module.scss'
import {IBaseComponentProps} from "../../types";
import {IconsArray} from './icons'

export type IconType = keyof typeof IconsArray;

export interface IIconProps extends IBaseComponentProps {
  iconType: IconType
}

export const Icon: FC<IIconProps> = ({className, iconType, ...otherProps}) => {
  const IconRender = IconsArray[iconType]

  return (
    <div className={classNames(styles.icon, className)} {...otherProps}>
      <IconRender/>
    </div>
  )
}

