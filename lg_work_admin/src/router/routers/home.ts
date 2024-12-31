const path = '/work'
import education from './education'
import center from './center'
import record from './record'
import tool from './tool'
const home = [
    {
        name: 'home',
        path: path,
        component: () => import('/src/views/index.vue'),
        children: [...education, ...center,...record,...tool]
    },


];
export default home;