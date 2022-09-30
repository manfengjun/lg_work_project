interface User {
    id: number
    username: string
    password: string
    token: string
    roomId: number
    teacherName: string
}
interface Room {
    id: number
    name: string
    level: string
}
interface Grade {
    id: number
    name: string
    level: string
    week: string
    time: string
    teacherId: number
    roomId: number
    teacherName: string
    roomName: string
}
export { User, Room, Grade}