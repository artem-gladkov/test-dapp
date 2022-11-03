import {FC} from 'react'
import classNames from 'classnames'

import styles from './Header.module.scss'
import {Container, IBaseComponentProps, Logo} from "../../../../shared";
import {useEthereumProviderStore} from "../../../../entities/ethereum-provider";
import {useEthereumSignerStore, Wallet} from "../../../../entities/ethereum-signer";
import {ButtonConnectWallet} from "../../../../features/connect-wallet";

export interface IHeaderProps extends IBaseComponentProps {
}

export const Header: FC<IHeaderProps> = ({className, ...otherProps}) => {
  const { provider } = useEthereumProviderStore()
  const { signer } = useEthereumSignerStore()

  return (
    <header className={classNames(styles.header, className)} {...otherProps}>
      <Container>
        <div className={styles.body}>
          <Logo className={styles.logo}/>
          {
            !!signer
              ? <Wallet address='0x1jqcds12...sk4e'/>
              : <ButtonConnectWallet />
          }
        </div>
      </Container>
    </header>
  )
}

