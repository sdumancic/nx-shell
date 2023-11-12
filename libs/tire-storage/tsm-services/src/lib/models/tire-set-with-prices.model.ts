import { TireSet } from './tire-set.model'
import { TireStoragePrice } from './tire-storage-price.model'

export interface TireSetWithPrices {
  tireSet: TireSet
  tireStoragePrice: TireStoragePrice
  tirePrice: number
  tireSetPrice: number
}
