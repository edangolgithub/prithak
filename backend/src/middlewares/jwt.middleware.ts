import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
  //  console.log(token);
    
    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    try {
      const decodedToken = this.jwtService.verify(token);
     // console.log('qr',decodedToken);
      
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
