import { HTTPMETHOD, SpiTarget } from "@service/spi/spi_target"
enum Student {
    students,
    insert,
    update,
    delete,
}

class StudentTarget extends SpiTarget {
    public type!: Student
    constructor(type: Student) {
        super();
        this.type = type
    }
    public get baseUrl(): string {
        return super.baseUrl
    }
    public get method(): HTTPMETHOD {
        switch (this.type) {
            case Student.students:
                return HTTPMETHOD.post
            case Student.insert:
                return HTTPMETHOD.post
            case Student.update:
                return HTTPMETHOD.post
            case Student.delete:
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
            case Student.insert:
                return '/student/insert'
            case Student.update:
                return '/student/update'
            case Student.students:
                return '/student/list'
            case Student.delete:
                return '/student/delete'
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
     * @memberof StudentTarget
     */
    static insert(data: {}) {
        let target = new StudentTarget(Student.insert)
        target.data = data
        return target
    }

    static students(data: {} = {}) {
        let target = new StudentTarget(Student.students)
        target.data = data
        return target
    }

    static deleteById(data: {} = {}) {
        let target = new StudentTarget(Student.delete)
        target.data = data
        return target
    }
}
export default StudentTarget
