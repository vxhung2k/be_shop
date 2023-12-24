import { ClassConstructor } from 'class-transformer'

export interface OptionMetaData<T> {
    serialization?: ClassConstructor<T>
    message?: string
}

export interface HttpResponseMetaData {
    languages: string[]
    timestamp: number
    timezone: string
    path: string
    [key: string]: any
}

interface HttpResponseMetaDataBasic {
    statusCode?: number
    message?: string
}

export interface ResponseBasic {
    _metadata?: HttpResponseMetaDataBasic
    [key: string]: any
}
