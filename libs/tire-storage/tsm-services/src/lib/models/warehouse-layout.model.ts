export interface WarehouseLayout {
  sections: WarehouseSection[]
}

export interface WarehouseSection {
  'id': number,
  'name': string
  'subsections': WarehouseSubsection[]
}

export interface WarehouseSubsection {
  name: string,
  boxes_by_rows: { [key: string]: WarehouseBox[]; }
}

export interface WarehouseBox {
  name: string,
  status: string
}
