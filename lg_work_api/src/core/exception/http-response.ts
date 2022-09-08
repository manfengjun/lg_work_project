/**
 * Custom HTTP Response
 */

interface HttpResponse {
    code: number
    message: string
    data: any

}
export class ResponseSuccess implements HttpResponse {
    code: number
    message: string
    data: any
    constructor(code: number, message: string, data: any) {
        this.code = code
        this.message = message
        this.data = data
    }
}

