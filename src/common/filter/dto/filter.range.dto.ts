import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, Max, Min } from 'class-validator'
import { CheckRangeValue } from 'src/helper/decorators/check-range.decorator'

export class FilterRangeDto {
    @ApiProperty({ required: true, example: 123 })
    @IsNumber()
    @Min(0)
    public from: number | string

    @ApiProperty({ required: true, example: 456 })
    @IsNumber()
    @Max(999999999999999)
    @CheckRangeValue({ message: 'The "to" value must be greater than "from".' })
    public to: number | string
}
