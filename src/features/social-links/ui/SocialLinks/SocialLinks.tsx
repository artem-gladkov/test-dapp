import {FC} from 'react'
import classNames from 'classnames'

import styles from './SocialLinks.module.scss'
import { SocialLink } from '../SocialLink'
import { IBaseComponentProps } from '../../../../shared'
import {SOCIALS_LIST} from "../../constants";

export interface ISocialLinksProps extends IBaseComponentProps {
}

export const SocialLinks: FC<ISocialLinksProps> = ({className, ...otherProps}) => {
  return (
    <div className={classNames(styles.socialLinks, className)} {...otherProps}>
      {SOCIALS_LIST.map(SocialLink)}
    </div>
  )
}
