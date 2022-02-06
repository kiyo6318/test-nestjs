import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entities/user.entity';
import { UserStatus } from './user-status.enum';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey123',
    });
  }

  async validate(payload: {
    id: string;
    email: string;
    status: UserStatus;
  }): Promise<User> {
    const { id, email, status } = payload;
    const user = await this.userRepository.findOne({ id, email, status });

    if (user) {
      return user;
    }

    throw new UnauthorizedException();
  }
}
