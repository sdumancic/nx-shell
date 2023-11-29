export interface StoredTireSetModel {
  offerId: number,
  customerId: number,
  tireSetId: string | null
  tireSetSeason: string | null
  tireSetBrand: string | null
  tireSetWidth: number | null
  tireSetHeight: number | null
  tireSetSize: number | null
  row: number | null
  col: number | null
  level: number | null
}
