import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/mysql/entities/User.entities';
import { UserOauth } from './typeorm/mysql/entities/UserOauths.entities';
import { MembershipModule } from './membership/membership.module';
import { MembershipItemType } from './typeorm/mysql/entities/MembershipItemType.entities';
import { MembershipType } from './typeorm/mysql/entities/MembershipType.entities';
import { UserVideos } from './typeorm/mysql/entities/UserVideos.entities';
import { UserArticle } from './typeorm/mysql/entities/UserArticles.entities';
import { Videos } from './typeorm/mysql/entities/Videos.entities';
import { Articles } from './typeorm/mysql/entities/Articles.entities';
import { ControllerModule } from './controller/controller.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MembershipModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'courses',
      entities: [User, UserOauth, MembershipItemType, MembershipType, UserVideos, UserArticle, Videos, Articles],
      synchronize: true,
    }),
    MembershipModule,
    ControllerModule,
    ContentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
