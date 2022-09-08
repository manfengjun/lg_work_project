import router from '../router'
class InitGlobal {
  constructor() {}
  init() {
    console.log(router)
    global.$router = router
  }
}

export default new InitGlobal()
