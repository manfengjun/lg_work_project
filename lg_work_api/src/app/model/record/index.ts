import Course from './course'
import Mould from './mould'
import Type from './type'


Course.hasMany(Mould, {
    foreignKey: 'courseId',
    sourceKey: 'id',
    as: "moulds"
});
Mould.belongsTo(Course, {
    foreignKey: 'courseId',
});


export { Course, Mould,Type}
