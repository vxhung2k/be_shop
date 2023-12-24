import { Injectable, PipeTransform, Query, Type, mixin } from '@nestjs/common'
import { assign, isEmpty, map } from 'lodash'
import { ILike } from 'typeorm'

export function SearchStringPipe(
    availableSearch: string[]
): Type<PipeTransform> {
    @Injectable()
    class MixinSearchStringPipe implements PipeTransform {
        async transform(
            value: Record<string, any>
        ): Promise<Record<string, any>> {
            if (value && !isEmpty(availableSearch)) {
                const searchQueries = map(availableSearch, (search) => {
                    return {
                        [search]: ILike(`%${value}%`),
                    }
                })
                return assign({}, ...searchQueries)
            }
            return {}
        }
    }
    return mixin(MixinSearchStringPipe)
}

export function SearchStringDecorator(
    field: string,
    availableSearch: string[]
): ParameterDecorator {
    return Query(field, SearchStringPipe(availableSearch))
}
