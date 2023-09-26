import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { BlockchainController } from './blockchain.controller';
import { HttpResponseService } from 'src/common/http-response.service';
import { ConfigService } from '@nestjs/config';
@Module({
  controllers: [BlockchainController],
  providers: [BlockchainService, HttpResponseService, ConfigService],
})
export class BlockchainModule {}
