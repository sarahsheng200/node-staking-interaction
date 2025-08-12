import { Router } from "express";
// import healthRouter from "./health";
import { StakeController } from "@stake/controllers/stake.controller";
import { WithdrawController } from "@withdraw/controllers/withdraw.controller";

const router = Router();
const stakeController = new StakeController();
const withdrawController = new WithdrawController();

// router.use("/health", healthRouter); // 健康检查路由
router.post("/stake", stakeController.stake);
router.post("/withdraw", withdrawController.withdraw);

export default router;
