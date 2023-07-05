import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google-strategy') {

    constructor() {
        super({
            clientID: "412692897178-53g6pf9k6pcps5lvphfbumg5ubpsn87k.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:3001/api/auth/google/redirect",
            scope: ['email', 'profile'],
            failureRedirect: "http://localhost:3000/"
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {

        const { id, emails } = profile;
        const user = {
            email: emails[0].value,
            social_type: 'google',
            social_id: id
        };

        done(null, user);
    }
}