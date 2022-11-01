import { FC, HTMLProps} from 'react'
import classNames from 'classnames'

import styles from './Container.module.scss'

export interface IContainerProps extends HTMLProps<HTMLDivElement>{}

export const Container: FC<IContainerProps> = ({className, children, ...otherProps}) => {
    return (
        <div className={classNames(styles.container, className)} {...otherProps}>
            {children}
        </div>
    )
}

