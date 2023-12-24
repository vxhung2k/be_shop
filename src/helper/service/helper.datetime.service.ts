import { Injectable } from '@nestjs/common'
import { IHelperDateTimeService } from '../interface/helper.datetime.interface'
import moment from 'moment'

@Injectable()
export class HelperDateTimeService implements IHelperDateTimeService {
    calculateAge(dateOfBirth: Date): number {
        return moment().diff(dateOfBirth, 'years')
    }

    timestamp(date?: string | number | Date): number {
        const mDate = date ? moment(date) : moment()
        return mDate.valueOf()
    }
}
