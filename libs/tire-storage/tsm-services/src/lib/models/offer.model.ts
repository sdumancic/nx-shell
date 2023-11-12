import { Customer } from './customer.model'
import { OfferStatusEnum, TireSetWithPrices } from '@nx-shell/tire-storage/tsm-domain'

export interface Offer {
  id?: number,
  customer: Customer
  tireSets: TireSetWithPrices[],
  startDate: Date
  endDate: Date
  status: OfferStatusEnum
  totalPrice: number
}
