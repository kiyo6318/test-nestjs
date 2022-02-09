import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Supporter } from 'src/entities/supporter.entity';
import { User } from 'src/entities/user.entity';
import { SupporterStatus } from '../supporters/supporter-status.enum';
import { SupporterRepository } from '../supporters/supporter.repository';
import { UserStatus } from './user-status.enum';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private supporterRepository: SupporterRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey123',
    });
  }

  async validate(payload: {
    id: string;
    email: string;
    status: SupporterStatus;
  }): Promise<Supporter> {
    const { id, email, status } = payload;
    const supporter = await this.supporterRepository.findOne({
      id,
      email,
      status,
    });

    if (supporter) {
      return supporter;
    }

    throw new UnauthorizedException();
  }
}
