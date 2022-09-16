import {Router} from 'vue-router'
import { User } from '~/model/base'

export {}

declare global {
  var $router: Router
  var user: User
}
