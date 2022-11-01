import { FC} from 'react'
import classNames from 'classnames'

import styles from './Logo.module.scss'
import {IBaseComponentProps} from "../../types";

export interface ILogoProps extends IBaseComponentProps{}

export const Logo: FC<ILogoProps> = ({className, ...otherProps}) => {
    return (
        <div className={classNames(styles.logo, className)} {...otherProps}>
            <h1>SFXDX</h1>
        </div>
    )
}

