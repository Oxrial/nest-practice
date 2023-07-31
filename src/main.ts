import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { VersioningType } from '@nestjs/common'
// session 是服务器 为每个用户的浏览器创建的一个会话对象 这个session 会记录到 浏览器的 cookie 用来区分用户
import * as session from 'express-session'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableVersioning({
        type: VersioningType.URI
    })
    app.use(
        session({
            //	生成服务端session 签名 可以理解为加盐
            secret: 'jiayan_qianming',
            // 生成客户端cookie 的名字 默认 connect.sid
            name: 'nestjs.sid',
            // 设置返回到前端 key 的属性，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }。
            cookie: { maxAge: null },
            // 在每次请求时强行设置 cookie，这将重置 cookie 过期时间(默认:false)
            rolling: true
        })
    )
    await app.listen(3000)
}
bootstrap()
