import {FC,} from 'react'
import classNames from 'classnames'

import styles from './Footer.module.scss'
import {Container, IBaseComponentProps, Logo} from "../../../../shared";
import {PrivacyLinks} from "../../../../shared";
import { SocialLinks } from '../../../../features/social-links';

export interface IFooterProps extends IBaseComponentProps {
}

export const Footer: FC<IFooterProps> = ({className, ...otherProps}) => {
  return (
    <footer className={classNames(styles.footer, className)} {...otherProps}>
      <Container>
        <div className={styles.body}>
          <div className={styles.main}>
            <PrivacyLinks />
            <Logo/>
            <SocialLinks className={styles.social}/>
          </div>
          <p className={styles.copyrightText}>
            ©2022 All rights reserved. Powered by Atla
          </p>
        </div>
      </Container>
    </footer>
  )
}

