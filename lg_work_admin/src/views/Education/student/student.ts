import { reactive, ref } from "vue"
import StudentTarget from "~/api/apis/student"
import GradeTarget from "~/api/apis/grade"
import { SpiAxios } from "@service/spi/spi"
import { Grade } from "~/model/base"
import Storage from "@service/storage/storage"
import { ElMessage, FormInstance } from "element-plus"
class Student {
    public id?: number
    public name!: string
    public petName?: string
    public level?: string
    public grade?: Grade
    public classId!: number
    public parent?: string
}
const option_status = ref(0)
const select = ref('')

/** 学生数据 */
const data_source = reactive({
    grade: {},
    data: [] as any,
})
const getList = () => {
    SpiAxios
        .create(GradeTarget.students({ "id": select.value }))
        .http()
        .then((data) => {
            console.log(data)
            data_source.grade = data
            data_source.data = data.students
        })
        .catch((err) => {
            console.log(err)
        })
}
/** 新增学生 */
const option = (formEl: FormInstance, form: Student) => {
    form.classId = form.grade?.id!
    if (!form.petName) {
        form.petName = form.name.substring(1)
    }
    switch (option_status.value) {
        case 0:
            form.id = undefined
            SpiAxios.create(StudentTarget.insert(form))
                .http()
                .then((data) => {
                    ElMessage.success("添加成功")
                    data_source.data.push(data)
                    formEl.resetFields()
                })
                .catch((err) => {
                    ElMessage.error(err.msg)
                    console.log(err)
                })
            break
        case 1:
            SpiAxios.create(StudentTarget.update(form))
                .http()
                .then((data) => {
                    ElMessage.success("修改成功")
                    getList()
                    formEl.resetFields()
                })
                .catch((err) => {
                    ElMessage.error(err.msg)
                    console.log(err)
                })
            break
        default:
            break
    }

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
        })
}
/** 班级数据 */
const grade = reactive({
    data: [] as Grade[],
})
const getGradeList = () => {
    SpiAxios
        .create(GradeTarget.grades())
        .http()
        .then((data) => {
            console.log(data)
            grade.data = data
        })
        .catch((err) => {
            console.log(err)
        })
}
export { select, option_status, Student, data_source, getList, option, deleteById, grade, getGradeList }