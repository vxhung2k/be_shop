export interface IHelperDateTimeService {
    calculateAge(dateOfBirth: Date): number
    timestamp(date?: string | Date | number): number
}
