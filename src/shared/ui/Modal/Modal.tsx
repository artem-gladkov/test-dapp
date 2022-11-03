import {FC, ReactNode, useCallback, useEffect, useState} from 'react'
import {createPortal} from 'react-dom'
import classNames from 'classnames'

import styles from './Modal.module.scss'
import {IBaseComponentProps} from "../../types";
import {Icon} from '../Icon';
import {Button} from "../Button";

export interface IModalProps extends IBaseComponentProps {
  title?: string
  children?: ReactNode
  mask?: boolean
  onOk?: () => void
  okText?: string
  onCancel: () => void
  isOpen: boolean
}

export const Modal: FC<IModalProps> = ({
  className,
  children,
  title,
  mask = false,
  onOk,
  okText,
  onCancel,
  isOpen,
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

  useEffect(() => {
    if(mask && isOpen) {
      document.querySelector('body')?.classList.add('overflow')
    } else {
      document.querySelector('body')?.classList.remove('overflow')
    }

    return () => {
      document.querySelector('body')?.classList.remove('overflow')
    }
  }, [mask, isOpen])

  return createPortal(
    <div className={classes} {...otherProps}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.cross} onClick={onCancel}>
            <Icon iconType='cross'/>
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
  )
}
