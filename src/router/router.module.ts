import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common'
import { RoutesAdminModule } from './routers/routers.admin.module'
import { RoutesPublicModule } from './routers/routers.public.module'
import { RoutesTestModule } from './routers/routers.test.module'
import { RoutersMainModule } from './routers/routers.main.module'
import { RouterModule as NestJsRouterModule } from '@nestjs/core'

@Module({})
export class RouterModule {
    static forRoot(): DynamicModule {
        const imports: (
            | DynamicModule
            | Type<any>
            | Promise<DynamicModule>
            | ForwardReference<any>
        )[] = []

        if (process.env.HTTP_ENABLE === 'true') {
            imports.push(
                RoutersMainModule,
                RoutesTestModule,
                RoutesPublicModule,
                RoutesAdminModule,
                NestJsRouterModule.register([
                    {
                        path: '/',
                        module: RoutersMainModule,
                    },
                    {
                        path: '/test',
                        module: RoutesTestModule,
                    },
                    {
                        path: '/public',
                        module: RoutesPublicModule,
                    },
                    // {
                    //     path: '/',
                    //     module: RoutesAdminModule,
                    // },
                ])
            )
        }
        return {
            module: RouterModule,
            providers: [],
            exports: [],
            controllers: [],
            imports,
        }
    }
}
