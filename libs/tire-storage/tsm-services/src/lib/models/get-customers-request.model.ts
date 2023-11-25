export interface GetCustomersRequest {
  paging?: { page: number, limit: number },
  sorting?: { attribute: string, order: string },
  filtering?: {
    firstName?: string,
    lastName?: string,
    gender?: string,
    street?: string,
    city?: string,
    state?: string,
    zip?: string,
    phoneNumber?: string,
    email?: string
  }
}
