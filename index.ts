import { StakingContract } from "./src/services/contract.service";
import { startServer } from "./app/server"; // 导入Express启动函数
import { initializeDB } from "@database/data-source";

const bootstrap = async () => {
  await initializeDB();
  await startServer();

  const contract = new StakingContract();
  await contract.listenToStake();
};

bootstrap();
