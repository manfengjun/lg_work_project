const path = 'tool'
const tool = [
    {
        name: 'bill',
        path: path + '/bill',
        component: () => import('/src/views/tool/bill/bill.vue')
    },
];

export default tool;