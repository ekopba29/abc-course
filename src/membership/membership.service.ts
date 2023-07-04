import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembershipType } from 'src/typeorm/mysql/entities/MembershipType.entities';
import { User } from 'src/typeorm/mysql/entities/User.entities';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class MembershipService {

    constructor(
        @InjectRepository(MembershipType) private membershipRepository: Repository<MembershipType>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async findById(id: number): Promise<MembershipType> {
        const membership = await this.membershipRepository.findOneBy({ id });
        return membership;
    }

    async setPlanUser(plan_id: number, user_id: number): Promise<Boolean> {
        const update = await this.userRepository
            .createQueryBuilder()
            .update(User)
            .set({ membership_type_id: plan_id })
            .where("id = :id", { id: user_id })
            .execute();
        return update ? true : false
    }

}
