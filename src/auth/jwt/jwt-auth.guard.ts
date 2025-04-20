import {
    BadRequestException,
    ExecutionContext,
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
  import { AuthGuard } from '@nestjs/passport';
  
  @Injectable()
  export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly reflector: Reflector) {
      super();
    }
  
    canActivate(context: ExecutionContext) {
      return super.canActivate(context);
    }
  
    handleRequest(err: any, user: any, info: any) {
      if (err) throw err;
  
      if (info instanceof Error) {
        const message = this.getTokenErrorMessage(info);
        throw message;
      }
  
      if (!user) {
        throw new NotFoundException('해당 사용자가 존재하지 않습니다.');
      }
  
      return user;
    }
  
    private getTokenErrorMessage(error: Error) {
      if (error instanceof TokenExpiredError) {
        return new UnauthorizedException('만료된 토큰입니다.');
      }
  
      if (error instanceof JsonWebTokenError) {
        return new UnauthorizedException('유효하지 않은 토큰입니다.');
      }
  
      if (error.message === 'No auth token') {
        return new UnauthorizedException('토큰이 없습니다.');
      }
  
      return new BadRequestException(error.message);
    }
  }
  