import {FC} from 'react'
import classNames from 'classnames'

import styles from './Header.module.scss'
import {Button, Container, IBaseComponentProps, Logo} from "../../../../shared";

export interface IHeaderProps extends IBaseComponentProps {
}

export const Header: FC<IHeaderProps> = ({className, ...otherProps}) => {
  return (
    <header className={classNames(styles.header, className)} {...otherProps}>
      <Container>
        <div className={styles.body}>
          <Logo className={styles.logo}/>
          <Button>Connect Wallet</Button>
        </div>
      </Container>
    </header>
  )
}

