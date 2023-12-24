import { ApiProperty } from '@nestjs/swagger'
import { IsDate } from 'class-validator'
import { CheckRangeDateTime } from 'src/helper/decorators/check-range-date.decorator'

export class FilterDateTimeRangeDto {
    @ApiProperty({ required: true, example: new Date() })
    @IsDate()
    public from: string

    @ApiProperty({ required: true, example: new Date() })
    @IsDate()
    @CheckRangeDateTime({
        message: 'The "to" value must be greater than "from".',
    })
    public to: string
}
