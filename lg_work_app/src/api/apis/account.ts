import { HTTPMETHOD, SpiTarget } from "@/service/spi/spi_target"
enum Account {
  login,
  register
}

class AccountTarget extends SpiTarget {
  public type!: Account
  constructor(type: Account) {
    super();
    this.type = type
  }
  public get baseUrl(): string {
    return super.baseUrl
  }
  public get method(): HTTPMETHOD {
    switch (this.type) {
      case Account.login:
        return HTTPMETHOD.post
      case Account.register:
        return HTTPMETHOD.post
      default:
        return HTTPMETHOD.get
    }
  }
  public set params(value: {}) {
    super.params = value;
  }
  public set data(value: {}) {
    super.data = value;
  }
  public get params(): {} {
    return super.params
  }
  public get data(): {} {
    return super.data
  }
  public get headers(): Record<string, string | number | boolean> {
    return super.headers
  }
  public get logEnable(): boolean {
    return super.logEnable
  }
  public get path(): string {
    switch (this.type) {
      case Account.login:
        return '/user/login'
      default:
        return ''
    }
  }

  /**
   *
   *
   * @static
   * @param {string} username
   * @param {string} password
   * @return {*} 
   * @memberof AccountTarget
   */
  static login(username: string, password: string) {
    let target = new AccountTarget(Account.login)
    target.data = { 'username': username, 'password': password }
    return target
  }
  /**
   *
   *
   * @static
   * @param {string} username
   * @param {string} password
   * @return {*} 
   * @memberof AccountTarget
   */
  static register(username: string, password: string) {
    let target = new AccountTarget(Account.login)
    target.data = { 'username': username, 'password': password }
    return target
  }
}
export default AccountTarget
