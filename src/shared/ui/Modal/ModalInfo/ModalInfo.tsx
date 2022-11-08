import {FC, useCallback, useState} from 'react'

import styles from './ModalInfo.module.scss'
import {BaseModal, IBaseModalProps} from "../BaseModal";

export interface IModalInfoProps extends Omit<IBaseModalProps, 'isOpen' | 'onCancel' | 'children'> {
  onCancel?: () => void
  text: string
}

export const ModalInfo: FC<IModalInfoProps> = ({
                                                 className,
                                                 onCancel,
                                                 onOk,
                                                 text,
                                                 ...otherProps
                                               }) => {
  const [isOpen, setIsOpen] = useState(true)

  const handleCancel = useCallback(() => {
    setIsOpen(false)
    onCancel && onCancel()
  }, [setIsOpen])

  const handleClickOk = useCallback(() => {
    setIsOpen(false)
    onOk && onOk()
  }, [setIsOpen])

  return (
    <BaseModal
      className={styles.modalInfo}
      onCancel={handleCancel}
      isOpen={isOpen}
      onOk={handleClickOk}
      {...otherProps}
    >
      <p>
        {text}
      </p>
    </BaseModal>
  )
}
