import { StakingContract } from "@services/staking-contract";

export class WithdrawService {
  private contract: StakingContract;
  constructor() {
    this.contract = new StakingContract();
  }

  async withdraw(index: string): Promise<any> {
    try {
      const value = BigInt(index);
      const tx = await this.contract.stakingContract.withdraw(value);
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
