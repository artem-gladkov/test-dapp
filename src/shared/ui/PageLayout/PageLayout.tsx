import {FC, ReactNode} from 'react'

import styles from './PageLayout.module.scss'
import {Header} from '../../../widgets/header'
import {Footer} from '../../../widgets/footer'

export interface IPageLayoutProps {
  children: ReactNode
}

export const PageLayout: FC<IPageLayoutProps> = ({children, ...otherProps}) => {
  return (
    <div className={styles.page} {...otherProps}>
      <Header />
      <div className={styles.body}>
        {children}
        <div className={styles.bg}>
          <div className={styles.bgEllipse} />
          <div className={styles.bgEllipse} />
          <div className={styles.bgEllipse} />
          <div className={styles.bgEllipse} />
        </div>
      </div>
      <Footer/>
    </div>
  )
}

