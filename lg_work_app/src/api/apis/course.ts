import { SpiTarget } from "@/service/spi/spi_target"
enum Course {
    courses,
    insert,
    update,
    delete,
    moulds
}

class CourseTarget extends SpiTarget {
    public type!: Course
    constructor(type: Course) {
        super();
        this.type = type
    }
    public get baseUrl(): string {
        return super.baseUrl
    }
    public get method(): HTTPMETHOD {
        switch (this.type) {
            case Course.courses:
                return "POST"
            case Course.commonMoulds:
                return "POST"
            case Course.moulds:
                return "POST"
            case Course.insert:
                return "POST"
            case Course.update:
                return "PUT"
            case Course.delete:
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
            case Course.insert:
                return '/course/insert'
            case Course.update:
                return '/course/update'
            case Course.courses:
                return '/course/list'
            case Course.moulds:
                return '/course/by'
            case Course.delete:
                return '/course/delete'
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
     * @memberof CourseTarget
     */
    static insert(data: {}) {
        let target = new CourseTarget(Course.insert)
        target.data = data
        return target
    }
    static update(data: {}) {
        let target = new CourseTarget(Course.update)
        target.data = data
        return target
    }
    static courses(data: {} = {}) {
        let target = new CourseTarget(Course.courses)
        target.data = data
        return target
    }
    static moulds(data: {} = {}) {
        let target = new CourseTarget(Course.moulds)
        target.data = data
        return target
    }
    
    static deleteById(data: {} = {}) {
        let target = new CourseTarget(Course.delete)
        target.data = data
        return target
    }
}
export default CourseTarget
