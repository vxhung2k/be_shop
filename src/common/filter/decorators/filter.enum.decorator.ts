import { Injectable, PipeTransform, Query, Type, mixin } from '@nestjs/common'
import { In } from 'typeorm'

export function FilterEnumPipe<T>(
    fieldName: string,
    defaultValue: T,
    enums: T[]
): Type<PipeTransform> {
    @Injectable()
    class MixinFilterEnumPipe implements PipeTransform {
        async transform(value: string): Promise<Record<string, any>> {
            let finalValue: T[] = defaultValue as T[]
            if (value) {
                finalValue = value
                    .split('_')
                    .map((val: string) => enums[val])
                    .filter((val: string) => val) as T[]
                return {
                    [fieldName]: In(finalValue),
                }
            }
            return {}
        }
    }
    return mixin(MixinFilterEnumPipe)
}

export function FilterEnumDecorator<T>(
    field: string,
    defaultValue: T,
    enums: T[]
): ParameterDecorator {
    return Query(field, FilterEnumPipe(field, defaultValue, enums))
}
