import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from 'src/typeorm/mysql/entities/User.entities';
import { UserOauth } from 'src/typeorm/mysql/entities/UserOauths.entities';
import { UserVideos } from 'src/typeorm/mysql/entities/UserVideos.entities';
import { MembershipItemType } from 'src/typeorm/mysql/entities/MembershipItemType.entities';
import { MembershipType } from 'src/typeorm/mysql/entities/MembershipType.entities';
import { Videos } from 'src/typeorm/mysql/entities/Videos.entities';
import { Articles } from 'src/typeorm/mysql/entities/Articles.entities';
import { UserArticle } from 'src/typeorm/mysql/entities/UserArticles.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, UserOauth, UserVideos, MembershipItemType, MembershipType, Videos, Articles, UserArticle
    ])
  ],
  controllers: [
    UserController,
  ],
  providers: [
    UserService,
  ],
  exports: [
    UserService,
  ],
})
export class UserModule { }
