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

  db_username: process.env.MYSQL_USERNAME || "root",
  db_password: process.env.MYSQL_PASSWORD || "",
  db_dbName: process.env.MYSQL_DATABASE || "web3-contract",
  db_url: process.env.MYSQL_URL || "127.0.0.1:3306",
};
