import { UsersService } from './../users/users.service';
import { Injectable, UseGuards } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './strategies/local/local-auth.guard';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.getUserWithPassword(username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const result = Object.keys(user)
        .filter((key) => key !== 'about')
        .reduce((res, key) => {
          res[key] = user[key];
          return res;
        }, {});
      return result;
    }
    return null;
  }

  @UseGuards(LocalAuthGuard)
  async signin(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
