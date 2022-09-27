const path = 'record'
const record = [
    {
        name: 'course',
        path: path + '/course',
        component: () => import('/src/views/record/course/course.vue')
    },
    {
        name: 'mould',
        path: path + '/mould',
        component: () => import('/src/views/record/mould/mould.vue')
    },
    {
        name: 'record',
        path: path + '/record',
        component: () => import('/src/views/record/record/record.vue')
    },

];

export default record;