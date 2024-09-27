import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserService } from 'src/users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    signIn(username: string, pass: string): Promise<{
        access_token: string;
    }>;
    signUp(createUserDto: CreateUserDto): Promise<{
        access_token: string;
    }>;
    googleLogin(user: any): Promise<{
        access_token: string;
    }>;
    facebookLogin(user: any): Promise<{
        access_token: string;
    }>;
}
