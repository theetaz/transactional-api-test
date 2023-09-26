import { HttpResponseService } from '../common/http-response.service';
import {
  Get,
  Controller,
  HttpStatus,
  Res,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { TransferTokenDto } from './dto/transfer-token.dto';

@Controller('blockchain')
export class BlockchainController {
  constructor(
    private readonly blockchainService: BlockchainService,
    private readonly httpResponseService: HttpResponseService,
  ) {}

  @Get('master-wallet-balance')
  async getMasterWalletBalance(@Res() response) {
    try {
      const result = await this.blockchainService.getMasterWalletTokenBalance();
      return response
        .status(HttpStatus.OK)
        .json(
          this.httpResponseService.send(
            this.httpResponseService.SUCCESS,
            HttpStatus.OK,
            result,
          ),
        );
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json(
          this.httpResponseService.send(
            error.message || this.httpResponseService.ERROR,
            HttpStatus.BAD_REQUEST,
            null,
          ),
        );
    }
  }

  @Get('get-balance/:walletAddress')
  async getBalanceByWalletAddress(
    @Param('walletAddress') walletAddress: string,
    @Res() response,
  ) {
    try {
      const result = await this.blockchainService.getWalletTokenBalance(
        walletAddress,
      );
      return response
        .status(HttpStatus.OK)
        .json(
          this.httpResponseService.send(
            this.httpResponseService.SUCCESS,
            HttpStatus.OK,
            result,
          ),
        );
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json(
          this.httpResponseService.send(
            error.message || this.httpResponseService.ERROR,
            HttpStatus.BAD_REQUEST,
            null,
          ),
        );
    }
  }

  @Post('transfer-token')
  async transferTokens(
    @Body() transferTokenDto: TransferTokenDto,
    @Res() response,
  ) {
    try {
      const result = await this.blockchainService.transferTokens(
        transferTokenDto.recipientWalletAddress,
        transferTokenDto.amount,
      );
      return response
        .status(HttpStatus.OK)
        .json(
          this.httpResponseService.send(
            this.httpResponseService.SUCCESS,
            HttpStatus.OK,
            result,
          ),
        );
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json(
          this.httpResponseService.send(
            error.message || this.httpResponseService.ERROR,
            HttpStatus.BAD_REQUEST,
            null,
          ),
        );
    }
  }

  @Get('get-transaction-details/:txHash')
  async getTransactionDetailsByTxHash(
    @Param('txHash') txHash: string,
    @Res() response,
  ) {
    try {
      const result = await this.blockchainService.getTransactionDetailsByTxHash(
        txHash,
      );
      return response
        .status(HttpStatus.OK)
        .json(
          this.httpResponseService.send(
            this.httpResponseService.SUCCESS,
            HttpStatus.OK,
            result,
          ),
        );
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json(
          this.httpResponseService.send(
            error.message || this.httpResponseService.ERROR,
            HttpStatus.BAD_REQUEST,
            null,
          ),
        );
    }
  }
}
