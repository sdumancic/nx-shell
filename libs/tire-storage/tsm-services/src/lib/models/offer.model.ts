import { Customer } from './customer.model'
import { OfferStatusEnum, } from '@nx-shell/tire-storage/tsm-domain'
import { TireSetWithPrices } from './tire-set-with-prices.model'

export interface Offer {
  id?: number,
  customer: Customer
  tireSets: TireSetWithPrices[],
  startDate: Date
  endDate: Date
  status: OfferStatusEnum
  totalPrice: number
}
