import { ApiProperty } from '@nestjs/swagger';

class TokenTransferDto {
  @ApiProperty({
    type: String,
    description:
      'This represents the transaction hash, which is a unique identifier for a particular transaction on the blockchain. It can be used to track or verify the status and details of a transaction. Typically, a transaction hash looks like a long string of numbers and letters, beginning with "0x',
  })
  txHash: string;

  @ApiProperty({
    type: Number,
    description:
      "This is an indicator of the transaction's outcome. Typically in wso2 blockchain contexts \n - 1 means the transaction was successful - 0 would mean the transaction failed",
  })
  status: number;

  @ApiProperty({
    type: Number,
    description:
      'Refers to the block number in the blockchain where the transaction has been added or committed',
  })
  committedBlockNumber: number;
}

export class TokenTransferResponseDto {
  @ApiProperty({
    description:
      'A message indicating the result of the API request, e.g., "success" or "error".',
  })
  message: string;

  @ApiProperty({ description: 'HTTP status code of the response.' })
  httpCode: number;

  @ApiProperty({
    description: 'Token transfer object details with transaction status.',
    type: TokenTransferDto,
  })
  payload: TokenTransferDto;
}
