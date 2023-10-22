export enum PhoneType {
  'office',
  'home',
  'mobile'
}

export interface User {
  id: number | null
  username: string
  password: string
  name: {
    first: string
    last: string
  }
  ssn: string
  dob: string
  hiredOn: string
  terminatedOn: string
  email: string
  phones: Phone[]
  address: Address
  gender: string
  portrait: string
  thumbnail: string
  roles: string[]
}

export interface Phone {
  type: PhoneType
  number: string
}

export interface Address {
  street: string
  city: string
  state: string
  zip: string
}
