import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
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
    async handleCallbackGoogleLogin(@Req() request: any, @Res() response: any) {

        if (!request.user) {
            return response.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
        }

        const user = await this.userService.findOrCreate(
            request.user.email,
            request.user.social_type,
            request.user.social_id
        );

        const payloadJWT = { id: user.id, username: request.user.email };

        return response.redirect('http://localhost:3000/callback_google?' + new URLSearchParams({
            email: request.user.email,
            access_token: await this.jwtService.signAsync(payloadJWT),
            membership: String(user.membership_type_id),
        }).toString())
    }
}
