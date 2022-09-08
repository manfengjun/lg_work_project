const path = '/work/center'
const center = [
    {
        name: 'center',
        path: path + '/index',
        component: () => import('/src/views/center/center.vue')
    },
    

];
export default center;