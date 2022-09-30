//routes 文件
import account from './routers/account'
import home from './routers/home'

const routes = [
    ...home,
    ...account,
];

export default routes;