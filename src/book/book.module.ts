import { Global, Module } from '@nestjs/common'
import { BookService } from './book.service'
import { BookController } from './book.controller'

// 因为app module中import了各个模块，所以在app的controller中不需要
// 而各个无关联的模块之间需要开启@Global()
@Global()
@Module({
    controllers: [BookController],
    providers: [
        BookService,
        { provide: 'BookGlobal', useValue: { msg: 'GLOBAL BOOK' } }
    ],
    exports: ['BookGlobal']
})
export class BookModule {}
