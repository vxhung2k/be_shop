import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator'

export function CheckRangeDateTime(validationOptions?: ValidationOptions) {
    return function (object: unknown, propertyName: string) {
        registerDecorator({
            name: 'CheckRangeDateTime',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const fromValue = args.object['from']
                    const toValue = value
                    if (fromValue instanceof Date && toValue instanceof Date) {
                        return fromValue.getTime() < toValue.getTime()
                    }
                    return true
                },
            },
        })
    }
}
