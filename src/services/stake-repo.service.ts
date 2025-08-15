import { AppDataSource } from "@database/data-source";

import { Stake } from "@entities/stake.entity";

export class StakeRepoService {
  private userRepo = AppDataSource.getRepository(Stake);

  async AddStake(data: Partial<Stake>): Promise<Stake> {
    const stake = this.userRepo.create(data);
    console.log("----Store stake success!----");
    return await this.userRepo.save(stake);
  }

  async getStakeByFromAddress(fromAddress: string): Promise<Stake[] | null> {
    return await this.userRepo.find({ where: { fromAddress } });
  }
}
