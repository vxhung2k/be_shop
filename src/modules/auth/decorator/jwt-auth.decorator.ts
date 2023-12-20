import { applyDecorators, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../jwt-auth.guard'

export function AuthAccessProtected(): MethodDecorator & ClassDecorator {
    return applyDecorators(UseGuards(JwtAuthGuard))
}
