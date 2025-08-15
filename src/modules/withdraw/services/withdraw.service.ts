import { StakingContract } from "@src/services/contract.service";

export class WithdrawService {
  private contract: StakingContract;
  constructor() {
    this.contract = new StakingContract();
  }

  async withdraw(index: string): Promise<any> {
    try {
      const value = BigInt(index);
      const tx = await this.contract.stakingContract.withdraw(value);
      await tx.wait();
      return {
        hash: tx.hash,
        contractAddress: tx.to,
        fromAddress: tx.from,
        method: "withdraw",
      };
    } catch (err) {
      return err;
    }
  }
}
