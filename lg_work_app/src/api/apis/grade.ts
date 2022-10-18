import { SpiTarget } from "@/service/spi/spi_target"
enum Grade {
    grades,
    insert,
    update,
    delete,
    students
}

class GradeTarget extends SpiTarget {
    public type!: Grade
    constructor(type: Grade) {
        super();
        this.type = type
    }
    public get baseUrl(): string {
        return super.baseUrl
    }
    public get method(): fetchConfigMethod {
        switch (this.type) {
            case Grade.grades:
                return "POST"
                case Grade.students:
                return "POST"
            case Grade.insert:
                return "POST"
            case Grade.update:
                return "PUT"
            case Grade.delete:
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
            case Grade.insert:
                return '/grade/insert'
            case Grade.update:
                return '/grade/update'
            case Grade.grades:
                return '/grade/list'
                case Grade.students:
                return '/grade/students'
            case Grade.delete:
                return '/grade/delete'
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
     * @memberof GradeTarget
     */
    static insert(data: {}) {
        let target = new GradeTarget(Grade.insert)
        target.data = data
        return target
    }
    static update(data: {}) {
        let target = new GradeTarget(Grade.update)
        target.data = data
        return target
    }
    static grades(data: {} = {}) {
        let target = new GradeTarget(Grade.grades)
        target.data = data
        return target
    }
    static students(data: {} = {}) {
        let target = new GradeTarget(Grade.students)
        target.data = data
        return target
    }
    static deleteById(data: {} = {}) {
        let target = new GradeTarget(Grade.delete)
        target.data = data
        return target
    }
}
export default GradeTarget
