import { ApiProperty } from '@nestjs/swagger';

class WalletBalanceByAddressDto {
  @ApiProperty({
    description: 'WSO2 Token balance for the given wallet address',
  })
  balance: string;

  @ApiProperty({
    description:
      "This value represents the balance of WSO2 tokens in Solidity's format. Solidity doesn't support floating-point numbers, so values are represented by multiplying with 10 raised to the power of the decimal precision defined in our smart contract Example: 1.5 WSO2 tokens will be represented as 1500000000000000000.",
  })
  tokenBalanceUnFormatted: string;

  @ApiProperty({
    description: "The token's decimal precision defined in our smart contract.",
  })
  decimals: number;
}

export class WalletBalanceByAddressResponseDto {
  @ApiProperty({
    description:
      'A message indicating the result of the API request, e.g., "success" or "error".',
  })
  message: string;

  @ApiProperty({ description: 'HTTP status code of the response.' })
  httpCode: number;

  @ApiProperty({
    description: 'WSO2 token balance of the given wallet.',
    type: WalletBalanceByAddressDto,
  })
  payload: WalletBalanceByAddressDto;
}
