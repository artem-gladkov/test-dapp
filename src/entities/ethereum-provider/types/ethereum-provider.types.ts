import {Web3Provider} from "@ethersproject/providers";

export interface EthereumProviderState {
  provider: Web3Provider | undefined
  networkId: number
}
