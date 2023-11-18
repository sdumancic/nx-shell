export interface TireSetMetadata {
  tireTypes: string[],
  tireBrands: string[],
  tireSizes: number[],
  tireWidths: number[],
  tireHeights: number[],
  speedIndexes: string[]
  loadIndexes: number[]
  treadDepths: TreadDepth[]
}

export interface TreadDepth {
  value: number
  displayValue: string
  color: string
}
