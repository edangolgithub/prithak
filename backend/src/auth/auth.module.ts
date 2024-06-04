import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../users/entities/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    JwtModule.register({
      global: true,
      secret: `223e2ed2d122185f478da0081b38f5d45f9540f9776ae9d4f65cb52ec68a8653dabe8ecee08a7d0a10d24e4f908b7758ce483ff667012b92f1d0b726a0bafa9d1a5a400731b2361be0af4ad5ea65a8c0c21f4310a33ca00f6ae6f49ed66315cefc462ea89e977c4610eb561ce517dbb254bf52cd6c90303ce5ab9ce62e874ca3ddfe4e0c895d6c2c1bfb555c9b9772ba1bacd8b5c3885640ad95fd6806d27540944567bc33365d307286712edffdf4e0a70c5e083c537a6e309ecf992d22bd0843650c3bcab80d02eb2a65d3e96f704ce03b6d2ae384ab6e0b4e9fec2d51951141bf62148a44f12ee81c8721356f661a077e0f4a9d11332684425446452d65c1`,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [AuthService,UsersService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
