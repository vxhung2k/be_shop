import { ILike } from 'typeorm'
import { Injectable, PipeTransform, Query, Type, mixin } from '@nestjs/common'

export function FilterStringPipe(fieldName: string): Type<PipeTransform> {
    @Injectable()
    class MixinFilterStringPipe implements PipeTransform {
        async transform(
            value: Record<string, any>
        ): Promise<Record<string, any>> {
            if (value) {
                return {
                    [fieldName]: ILike(`%${value}%`),
                }
            }
            return {}
        }
    }
    return mixin(MixinFilterStringPipe)
}

export function FilterStringDecorator(field: string): ParameterDecorator {
    return Query(field, FilterStringPipe(field))
}
