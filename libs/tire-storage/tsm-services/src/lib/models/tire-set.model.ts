import { TireDetails } from './tire-details.model'

export interface TireSet {
  id: string | null
  season: string | null
  brand: string | null
  width: number | null
  height: number | null
  size: number | null
  loadIndex: number | null
  speedIndex: string | null
  rimsIncluded: boolean | null
  runFlat: boolean | null
  customerId: number | null
  tires: TireDetails[] | []
}


