const path = '/work'
import education from './education'
import center from './center'
import record from './record'

const home = [
    {
        name: 'home',
        path: path,
        component: () => import('/src/views/index.vue'),
        children: [...education, ...center,...record]
    },


];
export default home;