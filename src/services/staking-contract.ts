import { ethers, Signer, JsonRpcProvider } from "ethers";
import contractAbi from "@config/abi/staking.json";
import { config } from "@config/constants";

export class StakingContract {
  public readonly provider: ethers.JsonRpcProvider;
  public readonly contractAddress: string;
  public readonly signer: Signer;
  public readonly stakingContract: ethers.Contract;

  constructor() {
    // 初始化Provider (BSC测试网)
    this.provider = new JsonRpcProvider(config.rpcUrl);

    // 初始化钱包
    this.signer = new ethers.Wallet(config.privateKey, this.provider);

    // 初始化合约
    this.contractAddress = config.contractAddress || ""; // 质押合约地址
    const abi = contractAbi; // 质押合约ABI

    this.stakingContract = new ethers.Contract(
      this.contractAddress,
      abi,
      this.signer
    );
    console.log("Ethers.js SDK初始化完成");
  }

  async stake(amount: number, period: number): Promise<any> {
    try {
      const tx = await this.stakingContract.stake(amount, period);
      return {
        hash: tx.hash,
        contractAddress: tx.to,
        fromAddress: tx.from,
        gasUsed: Number(tx.gasLimit),
        method: "stake",
      };
    } catch (err) {
      return err;
    }
  }

  async withdraw(index: string): Promise<any> {
    try {
      const value = BigInt(index);
      const tx = await this.stakingContract.withdraw(value);
      return {
        hash: tx.hash,
        contractAddress: tx.to,
        fromAddress: tx.from,
        gasUsed: Number(tx.gasLimit),
        method: "withdraw",
      };
    } catch (err) {
      return err;
    }
  }
}
