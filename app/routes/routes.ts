import { Router } from "express";
// import healthRouter from "./health";
import { StakeController } from "@stake/controllers/stake.controller";

const router = Router();
const stakeController = new StakeController();

// router.use("/health", healthRouter); // 健康检查路由
router.post("/stake", stakeController.stake);
router.post("/withdraw", stakeController.withdraw);

export default router;
