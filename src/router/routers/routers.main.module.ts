import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { AuthController } from 'src/modules/auth/auth.controller'
import { AuthModule } from 'src/modules/auth/auth.module'
import { AuthService } from 'src/modules/auth/auth.service'
import { CategoryController } from 'src/modules/category/category.controller'
import { CategoryModule } from 'src/modules/category/category.module'
import { MailModule } from 'src/modules/mail/mail.module'
import { ProductController } from 'src/modules/product/product.controller'
import { ProductModule } from 'src/modules/product/product.module'
import { RoleController } from 'src/modules/role/role.controller'
import { RoleModule } from 'src/modules/role/role.module'
import { UserController } from 'src/modules/user/user.controller'
import { UserModule } from 'src/modules/user/user.module'

@Module({
    imports: [
        TerminusModule,
        UserModule,
        RoleModule,
        AuthModule,
        ProductModule,
        CategoryModule,
        MailModule,
    ],
    controllers: [
        UserController,
        RoleController,
        RoleController,
        AuthController,
        ProductController,
        CategoryController,
    ],
    providers: [AuthService],
    exports: [],
})
export class RoutersMainModule {}
