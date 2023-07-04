import { Controller, Get, HttpCode, HttpStatus, ParseIntPipe, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt_guard.guard';
import { MembershipService } from './membership.service';
import { Response } from 'express';

@Controller('membership')
export class MembershipController {

    constructor(
        private membershipTypeService: MembershipService,
        private membershipService: MembershipService
    ) { }

    @UseGuards(JwtGuard)
    @Get('update_plan')
    async setMembershipUser(
        @Query('plan_id', ParseIntPipe) planId: number,
        @Req() request: any,
        @Res() res: Response
    ) {

        const findMembershipType = await this.membershipTypeService.findById(planId)

        if (!findMembershipType) {
            return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Plan Not Found' });
        }

        const updatePlan = this.membershipService.setPlanUser(planId, request.user.id)

        if (updatePlan) {
            return res.status(HttpStatus.OK).send({ message: 'Succes Update Plan ' });
        }

        return res.status(HttpStatus.NOT_IMPLEMENTED).send({ message: 'Cannot Update Plan' });
    }
}
