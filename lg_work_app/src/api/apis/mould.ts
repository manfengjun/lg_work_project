import { HTTPMETHOD, SpiTarget } from "@service/spi/spi_target"
enum Mould {
    moulds,
    insert,
    update,
    delete,
}

class MouldTarget extends SpiTarget {
    public type!: Mould
    constructor(type: Mould) {
        super();
        this.type = type
    }
    public get baseUrl(): string {
        return super.baseUrl
    }
    public get method(): HTTPMETHOD {
        switch (this.type) {
            case Mould.moulds:
                return HTTPMETHOD.post
            case Mould.insert:
                return HTTPMETHOD.post
            case Mould.update:
                return HTTPMETHOD.put
            case Mould.delete:
                return HTTPMETHOD.delete
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
            case Mould.insert:
                return '/mould/insert'
            case Mould.update:
                return '/mould/update'
            case Mould.moulds:
                return '/mould/list'
            case Mould.delete:
                return '/mould/delete'
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
     * @memberof MouldTarget
     */
    static insert(data: {}) {
        let target = new MouldTarget(Mould.insert)
        target.data = data
        return target
    }
    static update(data: {}) {
        let target = new MouldTarget(Mould.update)
        target.data = data
        return target
    }
    static moulds(data: {} = {}) {
        let target = new MouldTarget(Mould.moulds)
        target.data = data
        return target
    }

    static deleteById(data: {} = {}) {
        let target = new MouldTarget(Mould.delete)
        target.data = data
        return target
    }
}
export default MouldTarget
