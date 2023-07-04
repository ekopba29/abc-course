import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/mysql/entities/User.entities';
import { UserOauth } from 'src/typeorm/mysql/entities/UserOauths.entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(UserOauth) private userOauthRepository: Repository<UserOauth>,
    ) { }

    async findOrCreate(email: string, social_type: 'google', social_id: string | number): Promise<User> {

        const payloadOauth = {
            social_type: social_type,
            social_id: social_id as string
        }

        let findUser = await this.usersRepository.findOneBy({ email });
        let findOauth = await this.userOauthRepository.findOneBy(payloadOauth);

        if (!findUser) {
            findUser = await this.usersRepository.save({ email: email })
        }

        if (!findOauth) {
            findOauth = await this.userOauthRepository.save(Object.assign(payloadOauth, { user_id: findUser.id }));
        }

        return findUser;
    }

}
