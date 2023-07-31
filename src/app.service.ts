import { Injectable } from '@nestjs/common'

// controller中每个独立请求的具体处理逻辑，每个controller在使用service的时候需要在constructor注入该service
@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!'
    }
}
