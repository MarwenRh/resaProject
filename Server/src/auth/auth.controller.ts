import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Redirect,
  Req,
  Res,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request as req, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
  @Public()
  @Get('google')
  @Redirect()
  async googleLogin(@Req() req: Request, @Res() res: Response) {
    res.redirect(
      `https://accounts.google.com/o/oauth2/auth?` +
      `client_id=317229536668-7r23ec0b319s6hbtr26vasfrnhf2ia86.apps.googleusercontent.com&` +
      `redirect_uri=http://localhost:3000/auth/google/callback&` +
      `response_type=code&` +
      `scope=profile email`
    );
  }
  @Public()
  @Get('google/callback')
@UseGuards(AuthGuard('google'))
async googleAuthRedirect(@Req() req, @Res() res: Response) {
  const jwt = await this.authService.googleLogin(req.user);

  // Envoi du token JWT à la fenêtre parent et fermeture de la fenêtre contextuelle
  const responseHtml = `
    <script>
      window.opener.postMessage('${jwt.access_token}', '*'); // Envoie le token à la fenêtre parent
      window.close(); // Ferme la fenêtre popup
    </script>
  `;
  res.send(responseHtml); // Retourne ce script au navigateur
}

 @Post('google/callback')
async googleAuthCallback(@Body() body: { id_token: string }) {
    return this.authService.googleLogin(body.id_token);
}
  @Public()
  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Public()
  @Get('/facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Request() req): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      payload: req.user,
    };
  }
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
