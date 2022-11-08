import {IToken, TTokenSymbol} from "../../../shared/types/i-token";

export enum EOrderType {
  LIMIT = 'limit',
  MARKET = 'market'
}

export enum EOrderSide {
  BUY = 'buy',
  SELL = 'sell'
}

export interface IValidOrderData {
  aToken: IToken,
  bToken: IToken,
  aAmount: string
  bLimitPrice: string
  side: EOrderSide,
  type:EOrderType
  expectedPrice?: string
}

export interface IBaseOrderData {
  aAddress: string
  aAmount: string
  bAddress: string
  bLimitPrice: string
  side: EOrderSide,
  expectedPrice: string
}


export interface IPair {
  buy: TTokenSymbol,
  sell: TTokenSymbol
}
