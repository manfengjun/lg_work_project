const path = '/work/account'
const education = [
    {
        name: 'login',
        path: path + '/login',
        component: () => import('/src/views/account/login.vue')
    },
    

];
export default education;