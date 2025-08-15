import { ethers, Signer } from "ethers";
import contractAbi from "@config/abi/staking.json";
import { config } from "@config/constants";
import { StakeRepoService } from "@services/stake-repo.service";
import { Stake } from "@entities/stake.entity";
export class StakingContract {
  public readonly provider: ethers.JsonRpcProvider;
  public readonly contractAddress: string;
  public readonly signer: Signer;
  public readonly stakingContract: ethers.Contract;
  public readonly abi = contractAbi;
  public isRunning: boolean = false;
  batchSize = 100;
  public stakeRepoService: StakeRepoService;

  constructor() {
    this.stakeRepoService = new StakeRepoService();
    // 初始化Provider (BSC测试网)
    this.provider = new ethers.JsonRpcProvider(config.rpcUrl);

    // 初始化钱包
    this.signer = new ethers.Wallet(config.privateKey, this.provider);

    // 初始化合约
    this.contractAddress = config.contractAddress || ""; // 质押合约地址

    this.stakingContract = new ethers.Contract(
      this.contractAddress,
      this.abi,
      this.signer
    );
    console.log("Ethers.js SDK初始化完成");
  }

  async listenToStake() {
    const provider = new ethers.JsonRpcProvider(config.publicRpcUrl);
    const contract = new ethers.Contract(
      this.contractAddress,
      this.abi,
      provider
    );
    this.isRunning = true;
    let startBlock = await provider.getBlockNumber();
    console.log("start block: ", startBlock);

    while (this.isRunning) {
      let currentBlock = await provider.getBlockNumber();

      let endBlock = startBlock + this.batchSize - 1;
      if (endBlock > currentBlock) {
        endBlock = currentBlock;
      }

      if (endBlock > startBlock) {
        const stakeFilter = contract.filters.Staked();
        const transferEvent = await contract.queryFilter(
          stakeFilter,
          startBlock,
          endBlock
        );
        this.handleEventStore(transferEvent);
        startBlock = endBlock + 1;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 10000));
      }
    }
  }

  handleEventStore(transferEvent: (ethers.Log | ethers.EventLog)[]) {
    const validEvents = transferEvent.filter(this.isEventLog);
    if (validEvents.length > 0) {
      for (const event of validEvents) {
        const stake: Stake = {
          indexNum: event?.args[3],
          hash: event.transactionHash,
          contractAddress: event.address,
          fromAddress: event.topics[1],
          blockNumber: event.blockNumber,
          method: "stake",
          amount: event?.args[1].toString(),
          status: 0,
          timestamp: new Date(),
        };
        this.stakeRepoService.AddStake(stake);
      }
    }
  }

  // 1. 定义类型守卫，判断是否为 EventLog（包含 args）
  isEventLog(log: ethers.Log | ethers.EventLog): log is ethers.EventLog {
    return "args" in log;
  }
}
