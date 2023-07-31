/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
    getFactory(): string {
        return 'Factory test'
    }
    create(createUserDto: CreateUserDto): string {
        return 'This action adds a new user'
    }

    findAll(): string {
        return `This action returns all user`
    }
    findAll1(): string {
        return `This action returns all user2`
    }

    findOne(id: number): string {
        return `This action returns a #${id} user`
    }

    update(id: number, updateUserDto: UpdateUserDto): string {
        return `This action updates a #${id} user`
    }

    remove(id: number): string {
        return `This action removes a #${id} user`
    }
}
