import { TireSet } from '@nx-shell/tire-storage/tsm-services'

export interface TireSetSelectDialogDataModel {
  customerId: number
  tireSets: TireSet[]
  selectedTireSets: TireSet[]
}
