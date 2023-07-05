import { Controller, Get, HttpStatus, ParseIntPipe, Query, Req, Res, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt_guard.guard';
import { Articles } from 'src/typeorm/mysql/entities/Articles.entities';
import { MembershipItemType } from 'src/typeorm/mysql/entities/MembershipItemType.entities';
import { MembershipType } from 'src/typeorm/mysql/entities/MembershipType.entities';
import { User } from 'src/typeorm/mysql/entities/User.entities';
import { UserArticle } from 'src/typeorm/mysql/entities/UserArticles.entities';
import { UserVideos } from 'src/typeorm/mysql/entities/UserVideos.entities';
import { Videos } from 'src/typeorm/mysql/entities/Videos.entities';
import { Repository } from 'typeorm';

@Controller('user')
export class UserController {

    constructor(
        @InjectRepository(UserVideos) private userVideoRepo: Repository<UserVideos>,
        @InjectRepository(Videos) private videoRepo: Repository<Videos>,

        @InjectRepository(UserArticle) private userArticleRepo: Repository<UserArticle>,
        @InjectRepository(Articles) private articleRepo: Repository<Articles>,

        @InjectRepository(MembershipItemType) private membershipItemType: Repository<MembershipItemType>,
        @InjectRepository(MembershipType) private membershipType: Repository<MembershipType>,
        @InjectRepository(User) private userRepo: Repository<User>,
    ) {
    }

    @UseGuards(JwtGuard)
    @Get('profile')
    async getProfile(@Req() req: any) {
        return req.user
    }

    @UseGuards(JwtGuard)
    @Get('choose_video')
    async chooseVideo(@Query('video_id', ParseIntPipe) videoId: number, @Req() request: any, @Res() res: Response) {

        const findVideo = await this.videoRepo.findOneBy({ id: videoId })

        if (!findVideo) {
            return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Video Not Found' });
        }

        const findUser = await this.userRepo.findOneBy({ id: request.user.id })

        if (!findUser) {
            return res.status(HttpStatus.BAD_REQUEST).send({ message: 'User Not Found' });
        }

        const itemMembership = await this.membershipItemType.findOneBy({ id: findUser.membership_type_id })

        if (!itemMembership) {
            return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Plan Not Found' });
        }

        const totalVide = await this.userVideoRepo.countBy({ user_id: request.user.id })

        if (totalVide >= itemMembership.total_video && !itemMembership.unlimited_video) {
            return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Video Is Full' });
        }

        await this.userVideoRepo.save({ user_id: request.user.id, video_id: videoId })

        return res.status(HttpStatus.CREATED).send();

    }

    @UseGuards(JwtGuard)
    @Get('choose_article')
    async chooseArticle(@Query('article_id', ParseIntPipe) articleId: number, @Req() request: any, @Res() res: Response) {


        const findArticle = await this.articleRepo.findOneBy({ id: articleId })

        if (!findArticle) {
            return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Article Not Found' });
        }

        const findUser = await this.userRepo.findOneBy({ id: request.user.id })

        if (!findUser) {
            return res.status(HttpStatus.BAD_REQUEST).send({ message: 'User Not Found' });
        }

        const itemMembership = await this.membershipItemType.findOneBy({ id: findUser.membership_type_id })

        if (!itemMembership) {
            return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Plan Not Found' });
        }

        const totalArticle = await this.userArticleRepo.countBy({ user_id: request.user.id })

        if (totalArticle >= itemMembership.total_article && !itemMembership.unlimited_article) {
            return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Article Is Full' });
        }

        this.userArticleRepo.save({ user_id: request.user.id, article_id: articleId });

        return res.status(HttpStatus.CREATED).send();

    }

    @UseGuards(JwtGuard)
    @Get('read_article')
    async readArticle(@Query('article_id', ParseIntPipe) articleId: number, @Req() request: any, @Res() res: Response) {

        const findArticle = await this.userArticleRepo.findOneBy({ id: articleId, user_id: request.user.id })


        if (!findArticle) {
            return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Article Not Found' });
        }

        const article = await this.articleRepo.findOneBy({ id: articleId })

        return res.status(HttpStatus.CREATED).send(article);

    }

    @UseGuards(JwtGuard)
    @Get('watch_video')
    async watchVideo(@Query('video_id', ParseIntPipe) videoId: number, @Req() request: any, @Res() res: Response) {

        const findVideo = await this.userVideoRepo.findOneBy({ id: videoId, user_id: request.user.id })

        if (!findVideo) {
            return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Video Not Found' });
        }

        const video = await this.videoRepo.findOneBy({ id: videoId })

        return res.status(HttpStatus.CREATED).send(video);


    }

    @UseGuards(JwtGuard)
    @Get('my_video')
    async getMyVideo(@Req() request: any, @Res() res: Response) {
        const findVideo = await this.userVideoRepo.find({
            where: {
                user_id: request.user.id
            },
            relations: ["video"] // I get All object Entity (userId, password, login...) I want to only name and surname
        });

        if (!findVideo) {
            return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Video Not Found' });
        }

        return res.status(HttpStatus.OK).send(findVideo);
    }

    @UseGuards(JwtGuard)
    @Get('my_article')
    async getMyArticle(@Req() request: any, @Res() res: Response) {
        const findArticle = await this.userArticleRepo.find({
            where: {
                user_id: request.user.id
            },
            relations: ["article"] // I get All object Entity (userId, password, login...) I want to only name and surname
        });

        if (!findArticle) {
            return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Article Not Found' });
        }

        return res.status(HttpStatus.OK).send(findArticle);
    }

}
