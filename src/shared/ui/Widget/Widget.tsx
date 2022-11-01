import { FC, HTMLProps} from 'react'
import classNames from 'classnames'

import styles from './Widget.module.scss'

export interface IWidgetProps extends HTMLProps<any>{}

export const Widget: FC<IWidgetProps> = ({className, children, ...otherProps}) => {
    return (
        <div className={classNames(styles.widget, className)} {...otherProps}>
            {children}
        </div>
    )
}

