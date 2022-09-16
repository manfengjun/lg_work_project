import { reactive, ref } from "vue";
import GradeTarget from "~/api/apis/grade";
import RoomTarget from "~/api/apis/room";
import { SpiAxios } from "@service/spi/spi";
import Storage from "@service/storage/storage";
/** 班级数据 */
const list = reactive({
    data: [] as any,
});
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
export { list, room, getRoomList }