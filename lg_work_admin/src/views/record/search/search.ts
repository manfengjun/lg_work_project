import { reactive, ref } from "vue"
import { SpiAxios } from "@service/spi/spi"
import Storage from "@service/storage/storage"
import { ElMessage, FormInstance } from "element-plus"
import CourseTarget from "~/api/apis/course"
import { Course } from "../course/course"
import RecordTarget from "~/api/apis/record"
import { findProp } from "@vue/compiler-core"
class Record {
    public id?: number
    public content!: string
    public time?: string
    public courseId!: number
    public courseName!: string
    public studentId!: number
    public start_mould: string = ''
    public content_mould: string = ''
    public behavior_mould: string = ''
    public specific_mould: string = ''
    public end_mould: string = ''
}
const option_status = ref(0)
const current = ref<any>()
const select = ref('')
const level = ref('')
const course = ref<number>()
const form = reactive<Record>(new Record());

/** 学生数据 */
const data_source = reactive({
    data: [] as any,
})
const search = () => {
}
const getList = () => {
    SpiAxios
        .create(RecordTarget.getRecordByCourse({"id": course.value  }))
        .http()
        .then((data) => {
            console.log(data)
            let list = data.map((record: any) => {
                record.show_content = record.content?.replaceAll('&nbsp;', '').replaceAll('<p>', '').replaceAll('<P>', '').replaceAll('</p>', '').replaceAll('</P>', '')
                return record
            })
            data_source.data = list
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
/** 课程主题 */
const courses = reactive({
    data: [] as Course[],
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
export {
    form,
    search,
    select,
    option_status,

    current,
    Record,
    data_source,
    getList,

    level,
    course,
    courses,
    getCourseList,
}