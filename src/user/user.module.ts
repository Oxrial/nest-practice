import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'

@Module({
    controllers: [UserController],
    providers: [
        // 简写
        // ① UserService
        // ② 全写+重命名，须在controller重新指定该重命名
        { provide: 'UserServiceRename', useClass: UserService },
        // 自定义注入值
        {
            provide: 'CustomValue',
            useValue: ['a', 'b', 3]
        },
        {
            provide: 'FactoryService',
            // inject 对应的值必须为当前已注册在providers的对应的那个service
            // 若① 存在，则直接写默认UserService即可，不需要
            inject: ['UserServiceRename'],
            // 工厂模式可以添加额外的处理逻辑
            async useFactory(userService: UserService) {
                console.log(userService.getFactory())
                return await new Promise(resolve => {
                    setTimeout(() => {
                        resolve('async ' + userService.getFactory())
                    }, 1000)
                })
            }
        }
    ],
    // exports的导出值以providers注册的provide为准，
    // 导出后起别名的服务也需要@Inject指定
    exports: ['UserServiceRename']
})
export class UserModule {}
