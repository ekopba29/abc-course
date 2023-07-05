import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articles } from 'src/typeorm/mysql/entities/Articles.entities';
import { Videos } from 'src/typeorm/mysql/entities/Videos.entities';

@Module({
  controllers: [ContentController],
  imports: [
    TypeOrmModule.forFeature([
      Videos, Articles
    ])
  ],
})
export class ContentModule { }
