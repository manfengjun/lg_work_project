const path = '/work'
import education from './education'
import center from './center'
const home = [
    {
        name: 'home',
        path: path,
        component: () => import('/src/views/index.vue'),
        children: [...education, ...center]
    },


];
export default home;