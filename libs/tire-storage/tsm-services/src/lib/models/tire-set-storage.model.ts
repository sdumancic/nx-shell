import { TireSet } from './tire-set.model'

export interface TireSetStorage {
  id?: number,
  offerId: number,
  tireSet: TireSet;
  locationId: string
}
