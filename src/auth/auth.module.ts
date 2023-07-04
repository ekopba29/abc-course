import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategy/google.strategy';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/mysql/entities/User.entities';
import { UserOauth } from 'src/typeorm/mysql/entities/UserOauths.entities';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      User, UserOauth
    ]),
    JwtModule.register({
      global: true,
      secret: '#fdamik#$#FSkoads$#%%&^#$RRVCVGRkmdak23424enmi3$#@%2nsdkr4rs',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    GoogleStrategy,
    UserService
  ],
})
export class AuthModule { }
