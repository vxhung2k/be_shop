import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator'

export function CheckRangeValue(validationOptions?: ValidationOptions) {
    return function (object: unknown, propertyName: string) {
        registerDecorator({
            name: 'CheckRangeValue',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const fromValue = args.object['from']
                    const toValue = value

                    if (fromValue !== undefined && toValue !== undefined) {
                        return parseInt(fromValue) < parseInt(toValue)
                    }
                    return true
                },
            },
        })
    }
}
