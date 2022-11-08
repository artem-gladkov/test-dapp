import {httpClient} from "../../../shared/api";

export interface IFetchOrdersParams {
  user?: string
  tokenA?: string
  tokenB?: string
}

/**
 * Возвращает массив заявок. Параметры опциональны. Без параметров вернет все ордера.
 * С заданным tokenA\tokenB - все заявки где в паре есть tokenA и|или tokenB.
 * С параметром user - все заявки от конкретного пользователя.
 * @param params
 */
export const fetchOrders = (params?: IFetchOrdersParams) =>
  httpClient.get('/getOrders', {params}).then(resp => resp.data)

