import { reactive, ref } from "vue";
import StudentTarget from "~/api/apis/student";
import GradeTarget from "~/api/apis/grade";
import { SpiAxios } from "@service/spi/spi";
import { Grade } from "~/model/base";
import Storage from "@service/storage/storage";
import { ElMessage, FormInstance } from "element-plus";
class Student {
    public name!: string
    public petName?: string
    public level?: string
    public grade?: Grade
    public classId!: number
    public parent?: string
}


/** 学生数据 */
const list = reactive({
    data: [] as any,
});
const getList = () => {
    SpiAxios
        .create(StudentTarget.students())
        .http()
        .then((data) => {
            console.log(data);
            list.data = data;
        })
        .catch((err) => {
            console.log(err);
        });
}
/** 新增学生 */
const insert = (formEl: FormInstance, form: Student) => {
    form.classId = form.grade?.id!
    SpiAxios.create(StudentTarget.insert(form))
        .http()
        .then((data) => {
            ElMessage.success("添加成功");
            list.data.push(data);
            formEl.resetFields();
        })
        .catch((err) => {
            ElMessage.error(err.msg);
            console.log(err);
        });
}
/** 删除学生 */
const deleteById = (id: number) => {
    SpiAxios.create(StudentTarget.deleteById({ id: id }))
        .http()
        .then((data) => {
            ElMessage.success("删除成功")
            getList()
        })
        .catch((err) => {
            console.log(err)
        });
}
/** 班级数据 */
const grade = reactive({
    data: [] as Grade[],
});
const getGradeList = () => {
    SpiAxios
        .create(GradeTarget.grades())
        .http()
        .then((data) => {
            console.log(data);
            grade.data = data;
        })
        .catch((err) => {
            console.log(err);
        });
}
export { Student,list, getList, insert, deleteById, grade, getGradeList }