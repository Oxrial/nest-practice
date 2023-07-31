import { Controller, Get, Inject } from '@nestjs/common'
import { AppService } from './app.service'
import { UserService } from './user/user.service'

// web服务对外暴露请求接口路径
@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        @Inject('UserServiceRename') private readonly userService: UserService
    ) {}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }
    // 当其他层，如app的service需要使用user service的服务时，
    // 需要在app module中将user service暴露为共享模块
    // 当path与user中的重名时，例此时app与user中Get都是访问ip:port/user，此时访问的是app的Controller
    @Get('user')
    getUserList(): string {
        return 'app ' + this.userService.findAll()
    }
}
