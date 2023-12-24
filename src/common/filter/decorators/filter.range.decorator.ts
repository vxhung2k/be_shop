import { Injectable, PipeTransform, Query, Type, mixin } from '@nestjs/common'
import { split, toNumber } from 'lodash'
import { Between } from 'typeorm'

export function FilterRangePipe(fieldName: string): Type<PipeTransform> {
    @Injectable()
    class MixinFilterRangePipe implements PipeTransform {
        async transform(value: string): Promise<Record<string, any>> {
            const rangeValue = split(value, '_')
            const from = toNumber(rangeValue[0])
            const to = toNumber(rangeValue[1])
            if (value) {
                return {
                    [fieldName]: Between(from, to),
                }
            }
            return {}
        }
    }

    return mixin(MixinFilterRangePipe)
}

export function FilterRangeDecorator(field: string): ParameterDecorator {
    return Query(field, FilterRangePipe(field))
}
