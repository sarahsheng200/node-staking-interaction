import { StakingContract } from "@src/services/contract.service";

export class StakeService {
  private contract: StakingContract;
  constructor() {
    this.contract = new StakingContract();
  }

  async stake(amount: number, period: number): Promise<any> {
    try {
      // TEST: 查询provider连接到了哪条链
      console.log("\n2. 查询provider连接到了哪条链");
      const network = await this.contract.provider.getNetwork();
      console.log(network.toJSON());

      console.log("\n5. 查询当前建议的gas设置");
      const feeData = await this.contract.provider.getFeeData();
      console.log(feeData);

      //模拟执行一个可能会改变状态的函数，但不实际向区块链提交这个状态改变
      const txstaticCall = await this.contract.stakingContract.stake.staticCall(
        amount,
        period
      );
      console.log(`交易会成功吗？：`, txstaticCall);

      // TEST: END

      const tx = await this.contract.stakingContract.stake(amount, period);
      await tx.wait();
      return {
        hash: tx.hash,
        contractAddress: tx.to,
        fromAddress: tx.from,
        method: "stake",
      };
    } catch (err) {
      return err;
    }
  }
}
