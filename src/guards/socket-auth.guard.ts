import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ChannelGateway } from '../channels/gateways/сhannels.gateway';
@Injectable()
export class SocketAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const data = context.switchToWs().getData();
    console.log(data);

    return true;
  }
}
