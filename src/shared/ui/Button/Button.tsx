import {ButtonHTMLAttributes, FC} from 'react'
import classNames from 'classnames'

import styles from './Button.module.scss'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{

}

export const Button: FC<IButtonProps> = ({className, children, ...otherProps}) => {
    return (
        <button className={classNames(styles.button, className)} {...otherProps}>
            {children}
        </button>
    )
}

