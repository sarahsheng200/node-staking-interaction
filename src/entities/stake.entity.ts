import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

// 实体类对应数据库表
@Entity({
  name: "stake", // 数据库表名
  comment: "质押记录表", // 表注释
})
export class Stake {
  // 自增主键
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "自增主键ID",
  })
  id?: number;

  // 索引编号（字符串类型）
  @Column({
    type: "varchar",
    length: 100,
    name: "index_num",
    comment: "索引编号",
    nullable: false, // 非空
    default: "0", // 默认值
  })
  indexNum!: string;

  // 交易哈希（唯一索引）
  @Column({
    type: "varchar",
    length: 100,
    name: "hash",
    comment: "交易哈希",
    nullable: false,
  })
  hash!: string;

  // 合约地址
  @Column({
    type: "varchar",
    length: 100,
    name: "contract_address",
    comment: "合约地址",
    nullable: false,
  })
  contractAddress!: string;

  // 钱包地址
  @Column({
    type: "varchar",
    length: 100,
    name: "from_address",
    comment: "发起地址",
    nullable: false,
  })
  fromAddress!: string;

  // 操作方法（枚举类型）
  @Column({
    type: "enum",
    enum: ["stake", "withdraw"],
    name: "method",
    comment: "stake-stake，withdraw-withdraw",
    nullable: false,
  })
  method!: "stake" | "withdraw";

  // 质押金额（大数字字符串）
  @Column({
    type: "varchar",
    length: 255,
    name: "amount",
    comment: "交易金额（代币数量，含精度）",
    nullable: false,
  })
  amount?: string;

  // 区块编号
  @Column({
    type: "bigint",
    name: "block_number",
    comment: "区块编号",
    nullable: false,
  })
  blockNumber?: number;

  // 状态（ tinyint 类型）
  @Column({
    type: "tinyint",
    name: "status",
    comment: "状态：0-质押中，1-已提取",
    default: 0,
  })
  status?: number;

  // 交易时间戳
  @Column({
    type: "datetime",
    name: "timestamp",
    comment: "交易时间戳",
    nullable: false,
  })
  timestamp?: Date;

  // 记录创建时间（自动生成）
  @CreateDateColumn({
    type: "datetime",
    name: "created_date",
    comment: "记录创建时间",
  })
  createdDate?: Date;

  // 记录更新时间（自动更新）
  @UpdateDateColumn({
    type: "datetime",
    name: "updated_date",
    comment: "记录更新时间",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedDate?: Date;
}
