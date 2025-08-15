import { StakeService } from "@stake/services/stake.service";
import { Request, Response } from "express";

export class StakeController {
  private service = new StakeService();

  stake = async (req: Request, res: Response) => {
    try {
      const param = req.body;
      if (!param?.amount || typeof param?.period != "number") {
        return res.status(500).json({ error: "Stake param is invalid" });
      }

      const stake = await this.service.stake(param.amount, param.period);
      console.log("-------------stake", stake);
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
}
