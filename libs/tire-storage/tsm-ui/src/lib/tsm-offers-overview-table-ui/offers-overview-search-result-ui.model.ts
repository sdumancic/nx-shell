import { Customer, TireSetWithPrices } from '@nx-shell/tire-storage/tsm-services'
import { OfferStatusEnum } from '@nx-shell/tire-storage/tsm-domain'

export interface OffersOverviewSearchResultUi {

  id?: number,
  customer: Customer
  tireSets: TireSetWithPrices[],
  startDate: Date
  endDate: Date
  status: OfferStatusEnum
  totalPrice: number

}
