import { FC, HTMLProps} from 'react'
import classNames from 'classnames'

import styles from './Widget.module.scss'

export interface WidgetProps extends HTMLProps<any>{}

export const Widget: FC<WidgetProps> = ({className, children, ...otherProps}) => {
    return (
        <div className={classNames(styles.Widget, className)} {...otherProps}>
            {children}
        </div>
    )
}

