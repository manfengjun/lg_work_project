//routes 文件
import education from './routers/education'
import center from './routers/center'
import account from './routers/account'
import home from './routers/home'

const routes = [
    ...home,
    ...account
];

export default routes;