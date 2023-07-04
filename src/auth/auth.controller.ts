import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { response } from 'express';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    @Get('google/login')
    @UseGuards(AuthGuard('google-strategy'))
    handleLoginGoogle() { }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google-strategy'))
    async handleCallbackGoogleLogin(@Req() request: any) {

        if (!request.user) {
            return response.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
        }

        const user = await this.userService.findOrCreate(
            request.user.email,
            request.user.social_type,
            request.user.social_id
        );

        const payloadJWT = { id: user.id, username: request.user.email };

        return {
            user,
            access_token: await this.jwtService.signAsync(payloadJWT)
        }

    }
}
