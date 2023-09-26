import { IsNotEmpty } from '@nestjs/class-validator';

export class TransferTokenDto {
  @IsNotEmpty({ message: 'Recipient wallet address can not be empty' })
  readonly recipientWalletAddress: string;

  @IsNotEmpty({ message: 'Transfer amount can not be empty' })
  readonly amount: number;
}
