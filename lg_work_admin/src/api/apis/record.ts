import { HTTPMETHOD, SpiTarget } from "@service/spi/spi_target"
enum MemberRecord {
    records,
    insert,
    update,
    delete,
    getRecordByStudent,
    getRecordByCourse
}

class MemberRecordTarget extends SpiTarget {
    public type!: MemberRecord
    constructor(type: MemberRecord) {
        super();
        this.type = type
    }
    public get baseUrl(): string {
        return super.baseUrl
    }
    public get method(): HTTPMETHOD {
        switch (this.type) {
            case MemberRecord.records:
                return HTTPMETHOD.post

            case MemberRecord.getRecordByStudent:
                return HTTPMETHOD.post
            case MemberRecord.getRecordByCourse:
                return HTTPMETHOD.post
            case MemberRecord.insert:
                return HTTPMETHOD.post
            case MemberRecord.update:
                return HTTPMETHOD.put
            case MemberRecord.delete:
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
            case MemberRecord.insert:
                return '/record/insert'
            case MemberRecord.update:
                return '/record/update'
            case MemberRecord.records:
                return '/record/list'
            case MemberRecord.getRecordByStudent:
                return '/record/byStudent'
            case MemberRecord.getRecordByCourse:
                return '/record/byCourse'
            case MemberRecord.delete:
                return '/record/delete'
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
     * @memberof RecordTarget
     */
    static insert(data: {}) {
        let target = new MemberRecordTarget(MemberRecord.insert)
        target.data = data
        return target
    }
    static update(data: {}) {
        let target = new MemberRecordTarget(MemberRecord.update)
        target.data = data
        return target
    }
    static records(data: {} = {}) {
        let target = new MemberRecordTarget(MemberRecord.records)
        target.data = data
        return target
    }
    static getRecordByStudent(data: {} = {}) {
        let target = new MemberRecordTarget(MemberRecord.getRecordByStudent)
        target.data = data
        return target
    }
    static getRecordByCourse(data: {} = {}) {
        let target = new MemberRecordTarget(MemberRecord.getRecordByCourse)
        target.data = data
        return target
    }
    static deleteById(data: {} = {}) {
        let target = new MemberRecordTarget(MemberRecord.delete)
        target.data = data
        return target
    }
}
export default MemberRecordTarget
