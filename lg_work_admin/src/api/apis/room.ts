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
                return '/user/login'
            case Room.update:
                return '/user/login'
            case Room.rooms:
                return '/user/login'
            case Room.del:
                return '/user/login'
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

    static rooms() {

    }

}
export default RoomTarget
