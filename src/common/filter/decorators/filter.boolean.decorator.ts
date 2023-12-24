import { Injectable, PipeTransform, Query, Type, mixin } from '@nestjs/common'

export function FilterBooleanPipe(
    fieldName: string,
    defaultValue?: boolean
): Type<PipeTransform> {
    @Injectable()
    class MixinFilterBooleanPipe implements PipeTransform {
        async transform(
            value: Record<string, any>
        ): Promise<Record<string, any>> {
            if (value) {
                return {
                    [fieldName]: value,
                }
            }
            return { [fieldName]: defaultValue }
        }
    }

    return mixin(MixinFilterBooleanPipe)
}

export function FilterBooleanDecorator(
    field: string,
    defaultValue?: boolean
): ParameterDecorator {
    return Query(field, FilterBooleanPipe(field, defaultValue))
}
