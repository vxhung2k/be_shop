import { SetMetadata, UseInterceptors, applyDecorators } from '@nestjs/common'
import {
    MESSAGE_RESPONSE_DEFAULT_META_KEY,
    MESSAGE_RESPONSE_PAGING_META_KEY,
    RESPONSE_DEFAULT_META_KEY,
    RESPONSE_PAGING_META_KEY,
} from '../const/const'
import { ResponsePagingInterceptor } from '../interceptor/response-paging.interceptor'
import { OptionMetaData } from '../interface/response.interface'
import { ResponseDefaultInterceptor } from '../interceptor/response-default.interceptor'

export function ResponseDefault<T>(
    options?: OptionMetaData<T>
): MethodDecorator {
    return applyDecorators(
        UseInterceptors(ResponseDefaultInterceptor),
        SetMetadata(
            RESPONSE_DEFAULT_META_KEY,
            options ? options.serialization : undefined
        ),
        SetMetadata(
            MESSAGE_RESPONSE_DEFAULT_META_KEY,
            options ? options.message : undefined
        )
    )
}

export function ResponsePagination<T>(
    options?: OptionMetaData<T>
): MethodDecorator {
    return applyDecorators(
        UseInterceptors(ResponsePagingInterceptor),
        SetMetadata(
            RESPONSE_PAGING_META_KEY,
            options ? options.serialization : undefined
        ),
        SetMetadata(
            MESSAGE_RESPONSE_PAGING_META_KEY,
            options ? options.message : undefined
        )
    )
}
