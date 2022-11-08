import {
  FC,
  HTMLProps,
  useState,
  MouseEvent,
  useRef,
  ChangeEvent,
  RefObject
} from 'react'
import classNames from 'classnames'

import styles from './Input.module.scss'
import {useOutsideClick} from '../../lib';
import {nanoid} from "nanoid";
import {Button} from '../Button';

export interface IDropdownItem {
  value: string,
  label: string
}

export interface IInputProps extends Omit<HTMLProps<HTMLInputElement>, 'onChange'> {
  label?: string
  dropdown?: IDropdownItem[]
  onChange?: (value: string) => void
  error?: string | boolean
}

export const Input: FC<IInputProps> =
  ({
     className,
     label,
     readOnly,
     dropdown,
     onClick,
     onChange,
     error,
     value,
     onBlur,
     disabled,
     ...otherProps
   }) => {
    const [focus, setFocus] = useState(false)
    const componentRef: RefObject<HTMLLabelElement> = useRef(null)
    const inputRef: RefObject<HTMLInputElement> = useRef(null)

    useOutsideClick(() => {
      setFocus(false)
    }, componentRef, nanoid())

    const handleClickInput = (event: MouseEvent<HTMLInputElement>) => {
      if (!readOnly) {
        setFocus(true)
        onClick && onClick(event)
      }
    }

    const onClickDropdownItemCreator = (value: string) => (event: MouseEvent<HTMLButtonElement>) => {
      onChange && onChange(value)
      //@ts-ignore TODO костыль для валидации
      onBlur && onBlur()
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(event.currentTarget.value)
    }

    return (
      <label
        ref={componentRef}
        className={classNames(
          styles.wrapper,
          {
            [styles.readOnly]: readOnly,
            [styles.focus]: focus,
            [styles.success]: focus || (!error && !!value),
            [styles.error]: error,
            [styles.filled]: !!value,
            [styles.disabled]: disabled
          },
          className
        )}
      >
        <div className={styles.inputWrapper}>
          <input
            ref={inputRef}
            className={styles.input}
            readOnly={readOnly}
            onClick={handleClickInput}
            onChange={handleChange}
            value={value}
            onBlur={onBlur}
            disabled={disabled}
            {...otherProps}
          />
          {label && <p className={styles.label}>{label}</p>}
        </div>
        {
          dropdown &&
            <div className={classNames(styles.dropdown, {[styles.active]: focus})}>
              {dropdown.map(({value, label}) =>
                <Button
                  type='button'
                  key={value}
                  className={styles.dropdownItem}
                  onClick={onClickDropdownItemCreator(value)}
                >
                  {label}
                </Button>
              )}
            </div>
        }
      </label>
    )
  }
