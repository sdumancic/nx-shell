import { Phone, PhoneType, User } from '@nx-shell/users/user-services'
import { formatISO, parseISO } from 'date-fns'
import { UserUi } from '../form/user-ui.model'

export class UserProfileMapper {

  public static fromUserToFormGroup (loggedInUser: User) {
    return {
      userId: loggedInUser.id,
      username: loggedInUser.username,
      name: {
        first: loggedInUser.name.first,
        last: loggedInUser.name.last
      },
      ssn: loggedInUser.ssn,
      dob: loggedInUser.dob ? parseISO(loggedInUser.dob) : null,
      hiredOn: loggedInUser.hiredOn ? parseISO(loggedInUser.hiredOn) : null,
      terminatedOn: loggedInUser.terminatedOn ? parseISO(loggedInUser.terminatedOn) : null,
      email: loggedInUser.email,
      officePhone: UserProfileMapper.getPhone(loggedInUser.phones, PhoneType.office),
      homePhone: UserProfileMapper.getPhone(loggedInUser.phones, PhoneType.home),
      mobilePhone: UserProfileMapper.getPhone(loggedInUser.phones, PhoneType.mobile),
      address: {
        street: loggedInUser.address ? loggedInUser.address.street : null,
        city: loggedInUser.address ? loggedInUser.address.city : null,
        state: loggedInUser.address ? loggedInUser.address.state : null,
        zip: loggedInUser.address ? loggedInUser.address.zip : null,
      },
      gender: loggedInUser.gender,
      portrait: loggedInUser.portrait,
      thumbnail: loggedInUser.thumbnail,
      roles: []
    }
  }

  public static fromUserUiToUser (formValue: UserUi): Partial<User> {
    const phones: Phone[] = []
    const officePhone = formValue.officePhone ? { type: PhoneType.office, number: formValue.officePhone } : null
    const homePhone = formValue.homePhone ? { type: PhoneType.home, number: formValue.homePhone } : null
    const mobilePhone = formValue.mobilePhone ? { type: PhoneType.mobile, number: formValue.mobilePhone } : null
    if (officePhone) {
      phones.push(officePhone)
    }
    if (homePhone) {
      phones.push(homePhone)
    }
    if (mobilePhone) {
      phones.push(mobilePhone)
    }

    const retVal: Partial<User> = {
      id: formValue.userId,
      username: formValue.username,
      password: formValue.password ? formValue.password : undefined,
      name: {
        first: formValue.name.first,
        last: formValue.name.last,
      },
      ssn: formValue.ssn,
      dob: formValue.dob ? formatISO(formValue.dob) : '',
      hiredOn: formValue.hiredOn ? formatISO(formValue.hiredOn) : '',
      terminatedOn: formValue.terminatedOn ? formatISO(formValue.terminatedOn) : '',
      email: formValue.email,
      phones: phones,
      address: {
        street: formValue.address.street,
        city: formValue.address.city,
        state: formValue.address.state,
        zip: formValue.address.zip,
      },
      gender: formValue.gender,
      portrait: formValue.portrait,
      thumbnail: formValue.thumbnail,
      roles: formValue.roles
    }

    if (retVal.password === undefined) {
      delete retVal['password']
    }

    return retVal
  }

  private static getPhone (phones: Phone[], phoneType: PhoneType) {
    const phone = phones.find(p => p.type === phoneType)
    if (!phone) {
      return null
    }
    return phone.number
  }
}
