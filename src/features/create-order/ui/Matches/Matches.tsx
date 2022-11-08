import {FC, HTMLProps, useEffect, useState} from 'react'
import classNames from 'classnames'

import styles from './Matches.module.scss'
import axios from "axios";
import {getBaseBackendUrl, IBaseComponentProps} from "../../../../shared";
import {parseEther} from "@ethersproject/units";
import {IValidOrderData} from "../../types";

export interface IMatchesProps extends IBaseComponentProps {
  matchingOrders: string[]
}

export const Matches: FC<IMatchesProps> = ({
                                             className,
                                             matchingOrders,
                                             ...otherProps
                                           }) => {


  return (
    <div className={classNames(styles.matches, className)}>
      <h2>Sell</h2>
      {matchingOrders.length === 0
        ? <p className={styles.emptyText}>There is no matches for your order now</p>
        : <div>Ордер 1, Ордер 2, Ордер 3</div>
      }
    </div>
  )
}

