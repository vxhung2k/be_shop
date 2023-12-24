import { Injectable, PipeTransform, Query, Type, mixin } from '@nestjs/common'
import { split } from 'lodash'
import { Between } from 'typeorm'

export function FilterDateTimeRangePipe(
    fieldName: string
): Type<PipeTransform> {
    @Injectable()
    class MixinFilterDateTimeRangePipe implements PipeTransform {
        async transform(value: string): Promise<Record<string, any>> {
            const rangeValue = split(value, '_')
            const from = rangeValue[0]
            const to = rangeValue[1]
            if (value) {
                return {
                    [fieldName]: Between(from, to),
                }
            }
            return {}
        }
    }

    return mixin(MixinFilterDateTimeRangePipe)
}

export function FilterDateTimeRangeDecorator(
    field: string
): ParameterDecorator {
    return Query(field, FilterDateTimeRangePipe(field))
}
