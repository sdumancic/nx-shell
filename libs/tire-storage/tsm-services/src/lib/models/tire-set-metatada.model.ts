export interface TireSetMetadata {
  tireTypes: string[],
  tireBrands: string[],
  tireSizes: number[],
  tireWidths: number[],
  tireHeights: number[],
  speedIndex: string[]
  loadIndex: number[]
  treadDepth: TreadDepth[]
}

export interface TreadDepth {
  value: number
  displayValue: string
  color: string
}
