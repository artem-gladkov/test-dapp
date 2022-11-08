import {FC, useCallback, useEffect, useState} from 'react'
import classNames from 'classnames'

import styles from './FormCreateOrder.module.scss'
import {Button, getBaseBackendUrl, IBaseComponentProps, Input, SWAP_CONTRACT, Toggle, TOKENS} from "../../../../shared";
import {Controller, useForm} from "react-hook-form";
import {useEthereumSignerStore} from "../../../../entities/ethereum-signer";
import {OrderDetailsModal} from "../OrderDetailsModal";
import {EOrderSide, EOrderType, IBaseOrderData, IValidOrderData} from '../../types';
import {DROPDOWN_TOKENS} from '../../constants';
import {IToken} from "../../../../shared/types/i-token";
import axios from 'axios';
import {parseEther} from '@ethersproject/units';
import {Contract} from '@ethersproject/contracts';

export const INITIAL_FORM_STATE = {
  aAddress: '',
  bAddress: '',
  aAmount: '',
  side: EOrderSide.BUY,
  bLimitPrice: '',
  expectedPrice: ''
}

export interface IFormCreateOrderProps extends IBaseComponentProps {
  type: EOrderType
}

export const FormCreateOrder: FC<IFormCreateOrderProps> =
  ({
     className,
     type,
     ...otherProps
   }) => {
    const {signer} = useEthereumSignerStore()
    const [isOpenDetails, setIsOpenDetails] = useState(false)
    const [newOrder, setNewOrder] = useState<IValidOrderData>()

    const {
      handleSubmit,
      control,
      setValue,
      watch,
      formState: {isValid, isSubmitting},
      reset,
    } = useForm<IBaseOrderData>({
      mode: 'onBlur',
      defaultValues: INITIAL_FORM_STATE
    })
    const values = watch(['aAmount', 'bLimitPrice'])

    const onCancelModal = useCallback(() => {
      setIsOpenDetails(false)
    }, [setIsOpenDetails])

    const onSubmit = async (data: IBaseOrderData) => {
      try {
        const fetchOrderData = (): IValidOrderData => {
          const aToken = TOKENS.find(({address}) => address === data.aAddress) as IToken
          const bToken = TOKENS.find(({address}) => address === data.bAddress) as IToken

          return {
            aToken,
            bToken,
            bLimitPrice: data.bLimitPrice,
            expectedPrice: data.expectedPrice,
            side: data.side,
            aAmount: data.aAmount,
            type
          }
        }

        const validOrderData = fetchOrderData()
        setNewOrder(validOrderData)
        setIsOpenDetails(true)

      } catch (e) {
        console.log(e)
      }

    }

    useEffect(() => {
      const [a, b] = values
      const num = Number(a) * Number(b)
      const result = num > 0 ? num.toString() : ''
      setValue('expectedPrice', result)
    }, [values])

    useEffect(() => {
      reset()
    }, [type])

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className={classNames(styles.form, className)} {...otherProps}>
          <Controller
            name="side"
            control={control}
            render={({field: {value, ref, onChange, ...rest}}) => {
              const handleChange = (checked: boolean) => {
                onChange(checked ? EOrderSide.SELL : EOrderSide.BUY)
              }

              return <Toggle
                className={styles.toggle}
                checkedChildren='Sell'
                unCheckedChildren='Buy'
                checked={value === EOrderSide.SELL}
                onChange={handleChange}
                {...rest}
              />
            }
            }
          />

          <div className={styles.body}>
            <div className={styles.doubleFields}>
              <Controller
                name="aAddress"
                control={control}
                rules={{required: true}}
                render={({
                           field: {ref, ...field},
                           fieldState: {error},
                           formState: {isSubmitting}
                         }) => {


                  return <Input
                    label='Token A smart contract address'
                    dropdown={DROPDOWN_TOKENS}
                    error={!!error}
                    disabled={isSubmitting}
                    {...field}
                  />
                }}
              />
              <Controller
                name="aAmount"
                control={control}
                rules={{required: true}}
                render={({field: {ref, ...field}, fieldState: {error}, formState: {isSubmitting}}) => {
                  return <Input
                    label='Token A amount'
                    error={!!error}
                    disabled={isSubmitting}
                    {...field}
                  />
                }
                }
              />
            </div>
            <div className={styles.doubleFields}>
              <Controller
                name="bAddress"
                control={control}
                rules={{required: true}}
                render={({field: {ref, ...field}, fieldState: {error}, formState: {isSubmitting}}) =>
                  <Input
                    label='Token B smart contract address'
                    dropdown={DROPDOWN_TOKENS}
                    error={!!error}
                    disabled={isSubmitting}
                    {...field}
                  />}
              />
              {type === EOrderType.LIMIT &&
                  <Controller
                      name="bLimitPrice"
                      control={control}
                      rules={{required: true}}
                      render={({field: {ref, ...field}, fieldState: {error}, formState: {isSubmitting}}) => {
                        return <Input
                          label='Limit price (in Token B)'
                          error={!!error}
                          disabled={isSubmitting}
                          {...field}
                        />
                      }}
                  />}
            </div>
            <Controller
              name="expectedPrice"
              control={control}
              render={({field: {name, value}, fieldState: {error}}) => {
                return <Input
                  className={styles.expectedPrice}
                  label='Expected order price'
                  readOnly
                  error={!!error}
                  name={name}
                  value={value}
                />
              }}
            />
          </div>
          <Button
            type='submit'
            disabled={!isValid}
            loading={isSubmitting}
            loadingText='Searching for best price'
          >
            Place the order
          </Button>
        </form>
        {newOrder &&
            <OrderDetailsModal
                onCancel={onCancelModal}
                isOpen={isOpenDetails}
                mask
                fullOrderData={newOrder}
            />
        }
      </>
    )
  }
