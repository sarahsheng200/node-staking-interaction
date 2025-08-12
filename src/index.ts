import { StakingContract } from "./services/staking-contract";

async function demo() {
  const contract = new StakingContract();
  //contract.stake(3000,0)

  contract.withdraw(
    "10724156368758757087484455773036895164163555535907509179684120232267106967853"
  );
}

demo();
