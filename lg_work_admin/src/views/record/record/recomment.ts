import { reactive, ref } from "vue"
import StudentTarget from "~/api/apis/student"
import GradeTarget from "~/api/apis/grade"
import { SpiAxios } from "@service/spi/spi"
import { Grade } from "~/model/base"
import Storage from "@service/storage/storage"
import { ElMessage, FormInstance } from "element-plus"
import CourseTarget from "~/api/apis/course"
import { Course } from "../course/course"
import MouldTarget from "~/api/apis/mould"
import RecordTarget from "~/api/apis/record"
import { findProp } from "@vue/compiler-core"
class Record {
    public id?: number
    public content!: string
    public time?: string
    public mould?: string
    public behavior!: string
    public course?: Course
    public courseId!: number
    public courseName!: string
    public studentId!: number
}
const option_status = ref(0)
const select_student = ref<any>()
const select = ref('')
const form = reactive<Record>(new Record());

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
            data.students = data.students.map((student: any) => {
                if (student.records.length > 0) {
                    student.new_record = student.records[0]
                    student.new_record.show_content = student.new_record?.content.substring(0, 30) + '...'
                }
                return student
            })
            data_source.data = data.students
        })
        .catch((err) => {
            console.log(err)
        })
}
/** 新增成长记录 */
const option = (formEl: FormInstance) => {
    console.log(form)
    form.studentId = select_student.value.id
    form.courseId = form.course?.id!
    form.courseName = form.course?.name!
    form.content = form.mould!.replace('[BEHAVIOR]', form.behavior)
        .replaceAll('[NAME]', select_student.value.petName)
        .replaceAll('[COURSE]', form.course?.name!)
    switch (option_status.value) {
        case 0:
            form.id = undefined
            SpiAxios.create(RecordTarget.insert(form))
                .http()
                .then((data) => {
                    ElMessage.success("添加成功")
                    getList()
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
/** 模板数据 */
const moulds = reactive({
    start_moulds: [] as any,
    content_moulds: [] as any,
    behavior_moulds: [] as any,
    specific_moulds: [] as any,
    end_moulds: [] as any,
})
const getMouldsList = () => {
    SpiAxios
        .create(CourseTarget.moulds({ id: 1 }))
        .http()
        .then((data) => {
            console.log(data)
            moulds.start_moulds = data.moulds.filter((e: { type: number }) => { return e.type == 1 })
            moulds.end_moulds = data.moulds.filter((e: { type: number }) => { return e.type == 4 })
            console.log(moulds)
        })
        .catch((err) => {
            console.log(err)
        })
}
const getCourseBy = (id: number) => {
    SpiAxios
        .create(CourseTarget.moulds({ id: id }))
        .http()
        .then((data) => {
            moulds.content_moulds = data.moulds
        })
        .catch((err) => {
            console.log(err)
        })
}
/** 获取成长记录 */
const records = reactive({
    data: [] as [],
})
const getRecordList = (student: any) => {
    SpiAxios
        .create(RecordTarget.getRecordByStudent({ id: student.id }))
        .http()
        .then((data) => {
            console.log(data)
            records.data = data
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
/** 课程主题 */
const courses = reactive({
    data: [] as Course[],
})
const getCourseList = () => {
    SpiAxios
        .create(CourseTarget.courses({ "level": select_student.value.level }))
        .http()
        .then((data) => {
            console.log(data)
            courses.data = data
        })
        .catch((err) => {
            console.log(err)
        })
}
export {
    form,
    select,
    option_status,
    select_student,
    getCourseBy,
    Record,
    data_source,
    getList,
    option,
    courses,
    getCourseList,
    grade,
    moulds,
    getGradeList,
    getMouldsList,
    records,
    getRecordList
}