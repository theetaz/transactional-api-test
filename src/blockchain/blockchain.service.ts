import { Injectable, Logger } from '@nestjs/common';
import { ethers } from 'ethers';
import { blockchainConfigs } from '../config/blockchain.config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BlockchainService {
  private readonly logger = new Logger(BlockchainService.name);

  constructor(private configService: ConfigService) {}

  getWeb3Provider = async () => {
    /** Depending on choreo configurations you may need to use authentication header
     * to communicate with blockchain network.
     * 'User-Agent': 'PostmanRuntime/7.26.8' added due to choreo has protection mechanism for unknown user agents.
     **/
    const connection = {
      url: blockchainConfigs.rpcUrl,
      headers: {
        'User-Agent': 'PostmanRuntime/7.26.8',
        Authorization: 'Bearer ' + '',
      },
    };
    const provider = new ethers.providers.StaticJsonRpcProvider(
      connection,
      blockchainConfigs.chainID,
    );

    return provider;
  };

  getMasterWalletTokenBalance = async () => {
    const provider = await this.getWeb3Provider();
    const contract = new ethers.Contract(
      blockchainConfigs.contractAddress,
      blockchainConfigs.contractAbi,
      provider,
    );
    const decimals = await contract.decimals();
    const balance = await contract.balanceOf(
      this.configService.get('MASTER_WALLET_ADDRESS'),
    );

    // convert hex value to decimal format
    const formattedValue = ethers.utils.formatUnits(balance, decimals);

    return {
      masterWalletAddress: this.configService.get('MASTER_WALLET_ADDRESS'),
      balance: formattedValue,
      tokenBalanceUnFormatted: balance.toString(),
      decimals: decimals,
    };
  };

  getWalletTokenBalance = async (walletAddress: string) => {
    const provider = await this.getWeb3Provider();
    const contract = new ethers.Contract(
      blockchainConfigs.contractAddress,
      blockchainConfigs.contractAbi,
      provider,
    );
    const decimals = await contract.decimals();
    const balance = await contract.balanceOf(walletAddress);
    const formattedValue = ethers.utils.formatUnits(balance, decimals);

    return {
      balance: formattedValue,
      tokenBalanceUnFormatted: balance.toString(),
      decimals: decimals,
    };
  };

  getTransactionDetailsByTxHash = async (txHash: string) => {
    const provider = await this.getWeb3Provider();
    const txDetails = await provider.getTransaction(txHash);

    const contractInterface = new ethers.utils.Interface(
      blockchainConfigs.contractAbi,
    );
    const decodedData = contractInterface.parseTransaction({
      data: txDetails.data,
    });

    return {
      txDetails: txDetails,
      decodedData: decodedData,
    };
  };

  transferTokens = async (recipientWalletAddress: string, amount: number) => {
    const provider = await this.getWeb3Provider();

    // Create a wallet instance from a private key
    const wallet = new ethers.Wallet(
      this.configService.get('MASTER_WALLET_PRIVATE_KEY'),
    );
    const signer = wallet.connect(provider);

    const contract = new ethers.Contract(
      blockchainConfigs.contractAddress,
      blockchainConfigs.contractAbi,
      signer,
    );

    const decimals = await contract.decimals();

    const transferAmount = ethers.utils.parseUnits(amount.toString(), decimals);
    const options = {
      gasPrice: '35000000000',
    };
    const tx = await contract.transfer(
      recipientWalletAddress,
      transferAmount,
      options,
    );
    this.logger.log(`Transaction hash: ${tx.hash}`);

    const receipt = await tx.wait();
    this.logger.log(`Transaction was mined in block: ${receipt.blockNumber}`);

    return {
      txHash: tx.hash,
      status: receipt.status,
      committedBlockNumber: receipt.blockNumber,
    };
  };
}
