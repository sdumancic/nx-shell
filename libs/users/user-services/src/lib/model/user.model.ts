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
  ssn: string | null
  dob: string | null
  hiredOn: string | null
  terminatedOn: string | null
  email: string | null
  phones: Phone[]
  address: Address[]
  gender: string | null
  portrait: string | null
  thumbnail: string | null
  roles: string[]
}

export interface Phone {
  type: PhoneType
  number: string
}

export interface Address {
  type: string
  street: string | null
  city: string | null
  state: string | null
  zip: string | null
}
