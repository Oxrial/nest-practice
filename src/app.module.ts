import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { BookModule } from './book/book.module';

// 对外暴露当前模块，以及该模块下需要用到的controller和service都需要在app module中引入并注册
// 最终在app.module中集中引入
@Module({
    imports: [UserModule, BookModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
