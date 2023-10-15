export interface Customer {
  id?: number,
  firstName: string
  lastName: string
  gender: string
  address: Address
  phoneNumber: string
  email: string
}

export interface Address {
  street: string
  city: string
  state: string
  zip: string
}
