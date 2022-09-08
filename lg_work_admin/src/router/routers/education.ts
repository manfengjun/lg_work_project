const path = 'education'
const education = [
    {
        name: 'class',
        path: path + '/class',
        component: () => import('/src/views/education/class.vue')
    },
    {
        name: 'student',
        path: path + '/student',
        component: () => import('/src/views/education/student.vue')
    },
    {
        name: 'room',
        path: path + '/room',
        component: () => import('/src/views/education/room.vue')
    },
    {
        name: 'teacher',
        path: path + '/teacher',
        component: () => import('/src/views/education/teacher.vue')
    },

];

export default education;