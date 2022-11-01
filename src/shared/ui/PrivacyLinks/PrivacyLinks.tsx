import {FC } from 'react'
import classNames from 'classnames'

import styles from './PrivacyLinks.module.scss'
import {IBaseComponentProps} from "../../types";

export interface IPrivacyLinksProps extends IBaseComponentProps {}

export const PrivacyLinks: FC<IPrivacyLinksProps> = ({className, ...otherProps}) => {
  return (
    <div className={classNames(styles.privacyLinks, className)} {...otherProps}>
      <a className={styles.link} href="#">
        Privacy Policy
      </a>
      <a  className={styles.link} href="#">
        Terms & Conditions
      </a>
      <a  className={styles.link} href="#">
        Cookie Policy
      </a>
    </div>
  )
}

