import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Version,
    Inject
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('user')
export class UserController {
    // 重命名的module需要重新指定重命名后的名字，才能识别
    constructor(
        @Inject('UserServiceRename') private readonly userService: UserService,
        @Inject('CustomValue')
        private readonly customService: Array<string | number>,
        @Inject('FactoryService')
        private readonly factoryService: string,
        @Inject('BookGlobal')
        private readonly bookGlobalService: string
    ) {}
    @Get('global-book')
    getGlobalBook() {
        return this.bookGlobalService
    }
    // ip:port/user/custom
    @Get('custom')
    getCustom(): Array<string | number> {
        return this.customService
    }
    @Get('nofactory')
    getNoFactory(): string {
        return this.userService.getFactory()
    }
    @Get('factory')
    getFactory(): string {
        return this.factoryService
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto): string {
        return this.userService.create(createUserDto)
    }

    // 当app中path与user中的重名时，此条访问无效
    // 例此时app与user中Get都是访问ip:port/user，此时访问的是app的Controller
    @Get()
    findAll(): string {
        return 'user ' + this.userService.findAll()
    }
    // 版本控制 ip:port/v?/user
    @Get()
    @Version('1')
    findAll1(): string {
        return this.userService.findAll1()
    }
    // 动态参数
    @Get(':id')
    findOne(@Param('id') id: string): string {
        return this.userService.findOne(+id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): string {
        return this.userService.update(+id, updateUserDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string): string {
        return this.userService.remove(+id)
    }
}
