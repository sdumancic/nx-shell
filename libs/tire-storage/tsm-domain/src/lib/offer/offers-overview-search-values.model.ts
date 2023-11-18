import { OfferStatusEnum } from './offer-status.enum'

export interface OffersOverviewSearchValues {
  status: OfferStatusEnum
  seasons?: string[]
  brands?: string[]
  widths?: number[]
  heights?: number[]
  sizes?: number[]
  loadIndexes?: number[]
  speedIndexes?: string[]
}
