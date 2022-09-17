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
export { User, Room }