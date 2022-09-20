import { reactive, ref } from "vue"
import CourseTarget from "~/api/apis/course"
import GradeTarget from "~/api/apis/grade"
import { SpiAxios } from "@service/spi/spi"
import { Grade } from "~/model/base"
import Storage from "@service/storage/storage"
import { ElMessage, FormInstance } from "element-plus"
class Course {
    public id?: number
    public name!: string
    public level?: string
}
const option_status = ref(0)
const select = ref('6')

/** 主题数据 */
const data_source = reactive({
    grade: {},
    data: [] as any,
})
const getList = () => {
    SpiAxios
        .create(CourseTarget.courses({ "level": select.value }))
        .http()
        .then((data) => {
            console.log(data)
            data_source.data = data
        })
        .catch((err) => {
            console.log(err)
        })
}
/** 新增主题 */
const option = (formEl: FormInstance, form: Course) => {
    switch (option_status.value) {
        case 0:
            form.id = undefined
            SpiAxios.create(CourseTarget.insert(form))
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
            SpiAxios.create(CourseTarget.update(form))
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
/** 删除主题 */
const deleteById = (id: number) => {
    SpiAxios.create(CourseTarget.deleteById({ id: id }))
        .http()
        .then((data) => {
            ElMessage.success("删除成功")
            getList()
        })
        .catch((err) => {
            console.log(err)
        })
}
export { select, option_status, Course, data_source, getList, option, deleteById }