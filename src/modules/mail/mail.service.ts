import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import * as dotenv from 'dotenv'

dotenv.config()
const base_domain = process.env.BASE_DOMAIN

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendMailConfirmation(email: string, name: string, token: string) {
        const url = `${base_domain}/api/auth/reset-password?token=${token}`
        await this.mailerService.sendMail({
            to: email,
            from: '"Support Team" <support.myteam@gmail.com>',
            subject:
                'Welcome to my service! Confirm your Email if you want to reset password',
            template: './changePassword',
            context: {
                name: name,
                url,
            },
        })
    }
}
