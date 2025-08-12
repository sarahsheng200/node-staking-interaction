import { WithdrawService } from "@withdraw/services/withdraw.service";

import { Request, Response } from "express";

export class WithdrawController {
  private service = new WithdrawService();

  withdraw = async (req: Request, res: Response) => {
    try {
      const param = req.body;

      if (!param?.index) {
        return res.status(500).json({ error: "Withdraw param is invalid" });
      }
      const withdraw = await this.service.withdraw(param.index);

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
