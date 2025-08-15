import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || "8085",
  privateKey: process.env.PRIVATE_KEY || "",
  contractAddress: process.env.STAKING_CONTRACT_ADDRESS || "",
  rpcUrl:
    process.env.BSC_TESTNET_RPC ||
    "https://data-seed-prebsc-1-s1.binance.org:8545",
  // 代币小数位（根据实际合约调整）
  tokenDecimals: 18,

  DBUsername: process.env.MYSQL_USERNAME || "root",
  DBPassword: process.env.MYSQL_PASSWORD || "",
  DBName: process.env.MYSQL_DATABASE || "web3-contract",
  DBHost: process.env.MYSQL_URL || "127.0.0.1",
  DBPort: process.env.MYSQL_PORT || 3306,

  publicRpcUrl: "https://bsc-testnet-rpc.publicnode.com",
};
