import { HTTPMETHOD, SpiTarget } from "@service/spi/spi_target"
enum Room {
    rooms,
    insert,
    update,
    del,
}

class RoomTarget extends SpiTarget {
    public type!: Room
    constructor(type: Room) {
        super();
        this.type = type
    }
    public get baseUrl(): string {
        return super.baseUrl
    }
    public get method(): HTTPMETHOD {
        switch (this.type) {
            case Room.rooms:
                return HTTPMETHOD.post
            case Room.insert:
                return HTTPMETHOD.post
            case Room.update:
                return HTTPMETHOD.post
            case Room.del:
                return HTTPMETHOD.post
            default:
                return HTTPMETHOD.get
        }
    }
    public set params(value: {}) {
        super.params = value;
    }
    public set data(value: {}) {
        super.data = value;
    }
    public get params(): {} {
        return super.params
    }
    public get data(): {} {
        return super.data
    }
    public get headers(): Record<string, string | number | boolean> {
        return super.headers
    }
    public get logEnable(): boolean {
        return super.logEnable
    }
    public get path(): string {
        switch (this.type) {
            case Room.insert:
                return '/room/insert'
            case Room.update:
                return '/room/update'
            case Room.rooms:
                return '/room/list'
            case Room.del:
                return '/room/del'
            default:
                return ''
        }
    }
    /**
     *
     *
     * @static
     * @param {{}} data
     * @return {*} 
     * @memberof RoomTarget
     */
    static insert(data: {}) {
        let target = new RoomTarget(Room.insert)
        target.data = data
        return target
    }

    static rooms(data: {}) {
        let target = new RoomTarget(Room.rooms)
        target.data = data
        return target
    }

}
export default RoomTarget
