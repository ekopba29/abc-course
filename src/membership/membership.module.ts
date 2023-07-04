import { Module } from '@nestjs/common';
import { MembershipController } from './membership.controller';
import { MembershipService } from './membership.service';
import { MembershipItemType } from 'src/typeorm/mysql/entities/MembershipItemType.entities';
import { MembershipType } from 'src/typeorm/mysql/entities/MembershipType.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/typeorm/mysql/entities/User.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MembershipItemType, MembershipType, User
    ]),
    UserModule
  ],
  controllers: [MembershipController],
  providers: [MembershipService],
})
export class MembershipModule { }
