import { Injectable, PipeTransform, Query, Type, mixin } from '@nestjs/common'

export function FilterNumberPipe(fieldName: string): Type<PipeTransform> {
    @Injectable()
    class MixinFilterNumberPipe implements PipeTransform {
        async transform(
            value: Record<string, any>
        ): Promise<Record<string, any>> {
            if (value) {
                return {
                    [fieldName]: value,
                }
            }
            return {}
        }
    }
    return mixin(MixinFilterNumberPipe)
}

export function FilterNumberDecorator(field: string): ParameterDecorator {
    return Query(field, FilterNumberPipe(field))
}
