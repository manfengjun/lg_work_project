import { reactive, ref } from "vue";
import GradeTarget from "~/api/apis/grade";
import RoomTarget from "~/api/apis/room";
import { SpiAxios } from "@service/spi/spi";
import Storage from "@service/storage/storage";
import { ElMessage, FormInstance } from "element-plus";
/** 班级数据 */
const list = reactive({
    data: [] as any,
});
const getList = () => {
    SpiAxios
        .create(GradeTarget.grades())
        .http()
        .then((data) => {
            console.log(data);
            list.data = data;
        })
        .catch((err) => {
            console.log(err);
        });
}
/** 新增班级 */
const insert = (formEl: FormInstance,form: {}) => {
    SpiAxios.create(GradeTarget.insert(form))
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
/** 删除班级 */
const deleteById = (id: number) => {
    SpiAxios.create(GradeTarget.deleteById({ id: id }))
    .http()
    .then((data) => {
      ElMessage.success("删除成功");
    })
    .catch((err) => {
      console.log(err);
    });
}
/** 教室数据 */
const room = reactive({
    data: [] as any,
});
const getRoomList = () => {
    SpiAxios
        .create(RoomTarget.rooms())
        .http()
        .then((data) => {
            console.log(data);
            room.data = data;
        })
        .catch((err) => {
            console.log(err);
        });
}
export { list, getList, insert,deleteById, room, getRoomList }