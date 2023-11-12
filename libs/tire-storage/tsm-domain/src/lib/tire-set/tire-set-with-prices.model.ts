import { TireSet, TireStoragePrice } from '@nx-shell/tire-storage/tsm-services'

export interface TireSetWithPrices {
  tireSet: TireSet
  tireStoragePrice: TireStoragePrice
  tirePrice: number
  tireSetPrice: number
}
