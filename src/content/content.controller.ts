import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Articles } from 'src/typeorm/mysql/entities/Articles.entities';
import { Videos } from 'src/typeorm/mysql/entities/Videos.entities';
import { Repository } from 'typeorm';

@Controller('content')
export class ContentController {
    constructor(
        @InjectRepository(Articles) private articleRepos: Repository<Articles>,
        @InjectRepository(Videos) private videoRepos: Repository<Videos>,
    ) {}

    @Get('videos')
    getAllVideo(){
        return this.videoRepos.find()
    }

    @Get('articles')
    getAllArticles(){
        return this.articleRepos.find()
    }
}
