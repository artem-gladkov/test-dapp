import {FC, useEffect, useState} from 'react'
import classNames from 'classnames'

import styles from './OrderDetailsModal.module.scss'
import {BaseModal, IBaseModalProps} from "../../../../shared/ui/Modal/BaseModal";
import {Button, getBaseBackendUrl, SWAP_CONTRACT} from "../../../../shared";
import {OrderDetails} from "../OrderDetails";
import {Matches} from "../Matches";
import {EOrderType, IValidOrderData} from "../../types";
import {Contract} from "@ethersproject/contracts";
import {parseEther} from "@ethersproject/units";
import axios from "axios";
import {useEthereumSignerStore} from "../../../../entities/ethereum-signer";

export interface IOrderDetailsModalProps extends IBaseModalProps {
  fullOrderData: IValidOrderData
}

export const OrderDetailsModal: FC<IOrderDetailsModalProps> =
  ({
     className,
     fullOrderData: {
       aToken,
       bToken,
       aAmount,
       expectedPrice,
       side,
       type,
     },
     ...otherProps
   }) => {
    const {signer} = useEthereumSignerStore()
    const [matchingOrders, setMatchingOrders] = useState([])
    const [isMatching, setIsMatching] = useState(false)
    const [isCreatingOrder, setIsCreatingOrder] = useState(false)

    const isEmptyMatchingOrders = matchingOrders.length === 0

    useEffect(() => {
      fetchOrdersList()

      async function fetchOrdersList() {
        try {
          const ordersList = await axios.get(`${getBaseBackendUrl()}/getOrders`).then(resp => resp.data)
          console.log(ordersList)
        } catch (e) {
          console.log(e)
        }
      }

      fetchMatchingOrders()

      async function fetchMatchingOrders() {
        try {
          const matchingOrders = await axios.get(
            `${getBaseBackendUrl()}/getMatchingOrders`
            , {
              params: {
                tokenA: aToken.address,
                tokenB: bToken.address,
                amountA: parseEther(aAmount),
                amountB: parseEther(expectedPrice || '0'),
                isMarket: !expectedPrice
              }
            }
          ).then(response => response.data)

          setMatchingOrders(matchingOrders)
        } catch (e) {
          console.log(e)
        }
      }
    }, [])

    const onPlaceOrder = async () => {
      setIsCreatingOrder(true)

      try {
        const contract = new Contract(SWAP_CONTRACT.address, SWAP_CONTRACT.abi, signer)

        console.log('new order block data')
        console.log('ATokenAddress: ', aToken.address)
        console.log('BTokenAddress: ', bToken.address)
        console.log('amountA: ',  parseEther(aAmount))
        console.log('amountB: ',  parseEther('0'))

        const createOrderBlock = await contract.createOrder(
          aToken.address,
          bToken.address,
          parseEther(aAmount),
          parseEther('0')
        )

        const result = await createOrderBlock.wait()
        console.log('Order Created')
      } catch (e) {
        console.log(e)
      } finally {
        setIsCreatingOrder(false)
      }
    }

    const onMatchOrder = async () => {
      setIsMatching(true)
      const aContract = new Contract(aToken.address, aToken.abi, signer)
      const bContract = new Contract(bToken.address, bToken.abi, signer)

      try {
        const signerAddress = await signer?.getAddress()

        const approveTransactionA = await aContract.approve(SWAP_CONTRACT.address, parseEther('10'))

        const approvedA = await approveTransactionA.wait()

        const approveTransactionB = await bContract.approve(SWAP_CONTRACT.address, parseEther('10'))

        const approvedB = await approveTransactionB.wait()

        const contract = new Contract(SWAP_CONTRACT.address, SWAP_CONTRACT.abi, signer)

        const matchBlock = await contract.matchOrders(
          matchingOrders,
          aToken.address,
          bToken.address,
          parseEther(aAmount),
          parseEther(expectedPrice || '0'),
          type === EOrderType.MARKET
        )

        console.log({matchBlock})

        const result = await matchBlock.wait()

        console.log({result})

      } catch (e) {
        console.log(e)
      } finally {
        setIsMatching(false)
      }
    }

    return (
      <BaseModal wrapperClassName={classNames(styles.modal, className)} title='OrdersList Details' {...otherProps}>
        <div className={styles.body}>
          <OrderDetails
            amount={aAmount}
            pair={{buy: aToken.symbol, sell: bToken.symbol}}
            side={side}
            expectedPrice={expectedPrice}
            type={type}
          />
          <Matches matchingOrders={matchingOrders}/>
          <div className={styles.footer}>
            <Button
              isFull
              onClick={onMatchOrder}
              disabled={isEmptyMatchingOrders}
              loading={isMatching}
            >
              Match
            </Button>
            <Button
              isFull
              onClick={onPlaceOrder}
              disabled={!isEmptyMatchingOrders && false}
              loading={isCreatingOrder}
            >
              Place OrdersList
            </Button>
          </div>
        </div>
      </BaseModal>
    )
  }


