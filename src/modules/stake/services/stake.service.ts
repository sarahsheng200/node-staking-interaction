import { StakingContract } from "@services/staking-contract";

export class StakeService {
  private contract: StakingContract;
  constructor() {
    this.contract = new StakingContract();
  }

  async stake(amount: number, period: number): Promise<any> {
    try {
      const tx = await this.contract.stakingContract.stake(amount, period);
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
}
