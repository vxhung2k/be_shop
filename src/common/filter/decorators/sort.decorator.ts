import { Injectable, PipeTransform, Query, Type, mixin } from '@nestjs/common'
import {
    assign,
    includes,
    isEmpty,
    map,
    split,
    startsWith,
    trimStart,
} from 'lodash'

export function SortPipe(availableSort: string[]): Type<PipeTransform> {
    @Injectable()
    class MixinSortPipe implements PipeTransform {
        async transform(value: string): Promise<Record<string, any>> {
            if (value && !isEmpty(availableSort)) {
                const sortValues = split(value, ',')
                const sortQueries = map(sortValues, (sortValue) => {
                    if (includes(availableSort, sortValue)) {
                        if (startsWith(sortValue, '-')) {
                            const fieldName = trimStart(sortValue, '-')
                            return {
                                [fieldName]: 'DESC',
                            }
                        } else {
                            return { [sortValue]: 'ASC' }
                        }
                    }
                })
                return assign({}, ...sortQueries)
            }
            return {}
        }
    }
    return mixin(MixinSortPipe)
}

export function SortDecorator(
    field: string,
    availableSort: string[]
): ParameterDecorator {
    return Query(field, SortPipe(availableSort))
}
