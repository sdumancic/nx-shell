export interface SearchMeta {
  pagination?: { index: number, size: number }
  sorting?: { attribute: string, order?: string }
}
