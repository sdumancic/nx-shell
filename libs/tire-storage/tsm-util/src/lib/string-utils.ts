export class StringUtils {
  static toStringOrNull (value: any) {
    if (!value) {
      return null
    }

    let retVal = null
    try {
      retVal = String(value)
    } catch (e) {
      return null
    }
    return retVal
  }
}
