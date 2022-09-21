import { reactive, ref } from "vue"
import MouldTarget from "~/api/apis/mould"
import GradeTarget from "~/api/apis/grade"
import { SpiAxios } from "@service/spi/spi"
import { Grade } from "~/model/base"
import Storage from "@service/storage/storage"
import { ElMessage, FormInstance } from "element-plus"
import CourseTarget from "~/api/apis/course"
import TypeTarget from "~/api/apis/type"
class Mould {
    public id?: number
    public type!: string
    public isCommon!: boolean
    public content!: string
    public courseId!: number
}
const option_status = ref(0)
const mould_common = ref(false)
const level = ref('')
const course = ref<number>()

/** 模板数据 */
const data_source = reactive({
    grade: {},
    data: [] as any,
})
const getList = () => {
    SpiAxios
        .create(CourseTarget.moulds({ id: course.value }))
        .http()
        .then((data) => {
            console.log(data)
            data_source.data = data.moulds
        })
        .catch((err) => {
            console.log(err)
        })
}
const common_source = reactive({
    data: [] as any,
})
const getCommonList = () => {
    SpiAxios
        .create(CourseTarget.moulds({ id: 1 }))
        .http()
        .then((data) => {
            console.log(data)
            common_source.data = data.moulds
        })
        .catch((err) => {
            console.log(err)
        })
}
/** 新增模板 */
const option = (formEl: FormInstance, form: Mould) => {
    if (!form.isCommon) {
        if (level.value == '') {
            ElMessage.error("请选择龄段！")
            return
        }
        if (!course.value) {
            ElMessage.error("请选择主题！")
            return
        }

    }
    form.courseId = form.isCommon ? 1 : course.value ?? 0
    switch (option_status.value) {
        case 0:
            form.id = undefined
            SpiAxios.create(MouldTarget.insert(form))
                .http()
                .then((data) => {
                    ElMessage.success("添加成功")
                    mould_common.value ? getCommonList() : getList()
                    formEl.resetFields()
                })
                .catch((err) => {
                    ElMessage.error(err.msg)
                    console.log(err)
                })
            break
        case 1:
            SpiAxios.create(MouldTarget.update(form))
                .http()
                .then((data) => {
                    ElMessage.success("修改成功")
                    mould_common.value ? getCommonList() : getList()
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
/** 删除模板 */
const deleteById = (id: number) => {
    SpiAxios.create(MouldTarget.deleteById({ id: id }))
        .http()
        .then((data) => {
            ElMessage.success("删除成功")
            getList()
        })
        .catch((err) => {
            console.log(err)
        })
}
/** 课程主题模板 */
const courses = reactive({
    data: [] as any,
})
const getCourseList = () => {
    SpiAxios
        .create(CourseTarget.courses({ "level": level.value }))
        .http()
        .then((data) => {
            console.log(data)
            courses.data = data
        })
        .catch((err) => {
            console.log(err)
        })
}

/** 课程主题模板类型数据 */
const types = reactive({
    data: [] as any,
})
const getTypeList = () => {
    SpiAxios
        .create(TypeTarget.types())
        .http()
        .then((data) => {
            console.log(data)
            types.data = data
        })
        .catch((err) => {
            console.log(err)
        })
}
export {
    level,
    course,
    option_status,
    Mould,
    data_source,
    getList,
    common_source,
    getCommonList,
    option,
    deleteById,
    courses,
    getCourseList,
    types,
    getTypeList,
    mould_common
}