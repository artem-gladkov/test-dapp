import {FC, useEffect, useState} from 'react'
import classNames from 'classnames'

import styles from './UserOrders.module.scss'
import {getBaseBackendUrl, IBaseComponentProps, Table, TableRow, Widget} from "../../../../shared";
import {TableColumn} from "../../../../shared/ui/Table/TableHeader";
import axios from "axios";
import {useEthereumSignerStore} from "../../../../entities/ethereum-signer";

const COLUMNS: TableColumn[] = [{
  title: 'Type',
  accessor: 'type'
}, {
  title: 'Side',
  accessor: 'side'
}, {
  title: 'Amount',
  accessor: 'amount'
}, {
  title: 'Price',
  accessor: 'price'
}, {
  title: 'Filled',
  accessor: 'filled'
}, {
  title: 'Status',
  accessor: 'status'
}, {
  title: 'Cancel',
  accessor: 'cancel'
}]

export interface IUserOrdersProps extends IBaseComponentProps {
}

export const UserOrders: FC<IUserOrdersProps> = ({className, ...otherProps}) => {
  const {signer} = useEthereumSignerStore()
  const [isEmpty] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    fetchTable()

    async function fetchTable() {
      try {
        const address = await signer?.getAddress()
        const data = await axios.get(`${getBaseBackendUrl()}/getOrders`, {params: {user: address}}).then(resp => resp.data)
        const rows = data.map((item: any) => {
          const filledAmount = item.amountA - item.amountLeftToFill
          const status = Number(filledAmount) === Number(item.amountA) ? 'Filled' : 'Not Filled'

          return {
            key: item.id,
            cells: {
              amount: item.amountA,
              filled: filledAmount,
              status,
              cancel: 'N/A'
            }
          }
        })
        setData(rows)
      } catch (e) {
        console.log(e)
      }
    }
  }, [])

  return (
    <div className={classNames(styles.userOrders, className)} {...otherProps}>
      <Widget>
        <div className={styles.body}>
          <h1>My Orders</h1>
          {
            data.length === 0
              ? <p className={styles.emptyText}>Connect your wallet to start trading</p>
              : <Table columns={COLUMNS} rows={data}/>
          }
        </div>
      </Widget>
    </div>
  )
}

