import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: Record<string, any>): Promise<{
        access_token: string;
    }>;
    signUp(createUserDto: CreateUserDto): Promise<{
        access_token: string;
    }>;
    googleLogin(req: Request, res: Response): Promise<void>;
    googleAuthRedirect(req: any, res: Response): Promise<void>;
    googleAuthCallback(body: {
        id_token: string;
    }): Promise<{
        access_token: string;
    }>;
    facebookLogin(): Promise<any>;
    facebookLoginRedirect(req: any): Promise<any>;
    getProfile(req: any): any;
}
