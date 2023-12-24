import { HttpResponseMetaData } from './response.interface'

export class ResponseDefault<T = Record<string, any>> {
    statusCode: number
    message: any
    _metadata?: HttpResponseMetaData
    data?: T
}
