import { reactive, ref } from "vue"
import GradeTarget from "~/api/apis/grade"
import RoomTarget from "~/api/apis/room"
import { SpiAxios } from "@service/spi/spi"
import Storage from "@service/storage/storage"
import { ElMessage, FormInstance } from "element-plus"

const option_status = ref(0)

class Room {
    public id?: number
    public name!: string
    public level!: string
}
/** 教室数据 */
const list = reactive({
    data: [] as any,
})
const getList = () => {
    SpiAxios.create(RoomTarget.rooms())
        .http()
        .then((data) => {
            console.log(data)
            list.data = data
        })
        .catch((err) => {
            console.log(err)
        })
}
/** 教室操作 */
const option = (formEl: FormInstance, form: Room) => {
    switch (option_status.value) {
        case 0:
            // 新增教室
            SpiAxios.create(RoomTarget.insert(form))
                .http()
                .then((data) => {
                    ElMessage.success("添加成功")
                    list.data.push(data)
                    formEl.resetFields()
                })
                .catch((err) => {
                    ElMessage.error(err.msg)
                    console.log(err)
                })
            break
        case 1:
            // 修改教室
            SpiAxios.create(RoomTarget.update(form))
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
/** 删除班级 */
const deleteById = (id: number) => {
    SpiAxios.create(RoomTarget.deleteById({ id: id }))
        .http()
        .then((data) => {
            ElMessage.success("删除成功")
            getList()
        })
        .catch((err) => {
            console.log(err)
        })
}
export { Room, option_status, list, getList, option, deleteById }