import { Student } from '../class';
import Course from './course'
import Mould from './mould'
import Record from './record';
import Type from './type'


Course.hasMany(Mould, {
    foreignKey: 'courseId',
    sourceKey: 'id',
    as: "moulds"
});
Mould.belongsTo(Course, {
    foreignKey: 'courseId',
});


Student.hasMany(Record, {
    foreignKey: 'studentId',
    sourceKey: 'id',
    as: "records"
});
Record.belongsTo(Student, {
    foreignKey: 'studentId',
});
export { Course, Mould, Type, Record }
