import {FC, HTMLProps} from 'react'
import classNames from 'classnames'

import styles from './SocialLink.module.scss'
import {Icon, IconType} from "../../../../shared";

export interface ISocialLinkProps extends HTMLProps<HTMLAnchorElement> {
  href: string
  iconType: IconType
}

export const SocialLink: FC<ISocialLinkProps> = ({
     className,
     iconType,
     target = '_blank',
     href,
     ...otherProps
   }) => {
  return (
    <a key={href} href={href} target={target} className={classNames(styles.socialLink, className)} {...otherProps}>
      <Icon iconType={iconType}/>
    </a>
  )
}

