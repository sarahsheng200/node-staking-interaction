import { DataSource } from "typeorm";
import { config } from "@config/constants";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: config.DBHost,
  port: Number(config.DBPort),
  username: config.DBUsername,
  password: config.DBPassword, // 密码
  database: config.DBName, // 数据库名（需提前创建）
  synchronize: false, // 开发环境下自动同步实体到数据库表（生产环境建议关闭）
  logging: false, // 是否打印 SQL 日志
  entities: ["src/entities/*.ts"], // 实体类路径
});

export const initializeDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("database connect success!");
  } catch (err) {
    console.error("database connect failed: ", err);
  }
};
