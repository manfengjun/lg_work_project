import Room from './room'
import Teacher from './teacher'
import Student from './student'
import Grade from './grade'

Grade.hasMany(Student, {
    foreignKey: 'classId',
    sourceKey: 'id',
    as: "students"
});
Student.belongsTo(Grade, {
    foreignKey: 'classId',
});
export { Room, Teacher, Student, Grade}
