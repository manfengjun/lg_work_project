import router from '../router'
class InitGlobal {
  constructor() {}
  init() {
    global.$router = router
  }
}

export default new InitGlobal()
