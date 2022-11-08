import {FC, ReactNode, useCallback, useEffect, useState} from 'react'
import {createPortal} from 'react-dom'
import classNames from 'classnames'

import styles from './BaseModal.module.scss'
import {IBaseComponentProps} from "../../../types";
import {Icon} from "../../Icon";
import {Button} from "../../Button";

export interface IBaseModalProps extends IBaseComponentProps {
  title?: string
  children?: ReactNode
  mask?: boolean
  onOk?: () => void
  okText?: string
  onCancel: (isOpen?: boolean) => void
  isOpen: boolean
  wrapperClassName?: string
}

export const BaseModal: FC<IBaseModalProps> = ({
                                                 className,
                                                 children,
                                                 title,
                                                 mask = false,
                                                 onOk,
                                                 okText,
                                                 onCancel,
                                                 isOpen,
                                                 wrapperClassName,
                                                 ...otherProps
                                               }) => {
  const [modalContainer] = useState(() => document.querySelector('#root'))
  const classes = classNames(
    styles.modal,
    {
      [styles.mask]: mask,
      [styles.open]: isOpen
    },
    className
  )

  const handleCancel = useCallback(() => {
    onCancel(!isOpen)
  }, [isOpen])

  useEffect(() => {
    if (mask && isOpen) {
      document.querySelector('body')?.classList.add('overflow')
    } else {
      document.querySelector('body')?.classList.remove('overflow')
    }

    return () => {
      document.querySelector('body')?.classList.remove('overflow')
    }
  }, [mask, isOpen])

  return isOpen ? createPortal(
    <div className={classes} {...otherProps}>
      <div className={classNames(styles.wrapper, wrapperClassName)}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.cross} onClick={handleCancel}>
            <Icon iconType='cross' isInteractive/>
          </button>
        </div>
        <div className={styles.body}>
          {children}
        </div>
        {
          onOk &&
            <div className={styles.footer}>
                <Button className={styles.buttonClose} isFull onClick={onOk}>Okay</Button>
            </div>
        }
      </div>
    </div>, modalContainer as Element
  ) : null
}
