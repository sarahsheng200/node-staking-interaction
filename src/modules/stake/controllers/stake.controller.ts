import { StakingContract } from "@services/staking-contract";
import Decimal from "decimal.js";
import { Request, Response } from "express";

export class StakeController {
  private stakeService = new StakingContract();

  stake = async (req: Request, res: Response) => {
    try {
      const param = req.body;
      if (!param?.amount || !param?.period) {
        return res.status(500).json({ error: "Stake param is invalid" });
      }

      const stake = await this.stakeService.stake(param.amount, param.period);

      if (stake?.hash) {
        return res.status(200).json({ data: stake });
      } else {
        return res
          .status(500)
          .json({ msg: "Stake event failed", error: stake });
      }
    } catch (err) {
      return res.status(500).json({ msg: "Stake failed", error: err });
    }
  };

  withdraw = async (req: Request, res: Response) => {
    try {
      const param = req.body;
      console.log("-----param----", param);

      if (!param?.index) {
        return res.status(500).json({ error: "Withdraw param is invalid" });
      }
      const withdraw = await this.stakeService.withdraw(param.index);

      if (withdraw?.hash) {
        return res.status(200).json({ data: withdraw });
      } else {
        return res
          .status(500)
          .json({ msg: "Withdraw event failed", error: withdraw });
      }
    } catch (err) {
      return res.status(500).json({ msg: "Withdraw failed", error: err });
    }
  };
}
