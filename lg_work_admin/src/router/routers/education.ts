const path = 'education'
const education = [
    {
        name: 'grade',
        path: path + '/grade',
        component: () => import('/src/views/education/grade/grade.vue')
    },
    {
        name: 'student',
        path: path + '/student',
        component: () => import('/src/views/education/student/student.vue')
    },
    {
        name: 'room',
        path: path + '/room',
        component: () => import('/src/views/education/room/room.vue')
    },
    {
        name: 'teacher',
        path: path + '/teacher',
        component: () => import('/src/views/education/teacher.vue')
    },

];

export default education;