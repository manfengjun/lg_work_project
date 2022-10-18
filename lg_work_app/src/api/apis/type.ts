import { SpiTarget } from "@/service/spi/spi_target"
enum Type {
    types,
    insert,
    update,
    delete,
}

class TypeTarget extends SpiTarget {
    public type!: Type
    constructor(type: Type) {
        super();
        this.type = type
    }
    public get baseUrl(): string {
        return super.baseUrl
    }
    public get method(): fetchConfigMethod {
        switch (this.type) {
            case Type.types:
                return "POST"
            case Type.insert:
                return "POST"
            case Type.update:
                return "PUT"
            case Type.delete:
                return "DELETE"
            default:
                return "POST"
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
            case Type.insert:
                return '/type/insert'
            case Type.update:
                return '/type/update'
            case Type.types:
                return '/type/list'
            case Type.delete:
                return '/type/delete'
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
     * @memberof TypeTarget
     */
    static insert(data: {}) {
        let target = new TypeTarget(Type.insert)
        target.data = data
        return target
    }
    static update(data: {}) {
        let target = new TypeTarget(Type.update)
        target.data = data
        return target
    }
    static types(data: {} = {}) {
        let target = new TypeTarget(Type.types)
        target.data = data
        return target
    }

    static deleteById(data: {} = {}) {
        let target = new TypeTarget(Type.delete)
        target.data = data
        return target
    }
}
export default TypeTarget
