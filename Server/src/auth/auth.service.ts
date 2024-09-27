import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOneByEmail(username);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { username: user.email, sub: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findOneByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // Hashing the password
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const payload = { email: newUser.email, sub: newUser._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async googleLogin(user: any) {
    // Check if the user already exists in the database
    const existingUser = await this.usersService.findOneByEmail(user.email);

    if (!existingUser) {
      // If the user doesn't exist, create a new user
      const newUser = await this.usersService.create({
        email: user.email,
      
        password: null, // No password for Google-authenticated users
      });
    }

    const payload = { username: user.email, sub: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async facebookLogin(user: any) {
    // Check if the user already exists in the database
    const existingUser = await this.usersService.findOneByEmail(user.email);
  
    if (!existingUser) {
      // Create a new user if they don't exist
      const newUser = await this.usersService.create({
        email: user.email,
        
        password: null, // No password for Facebook-authenticated users
      });
    }
  
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
 
}
