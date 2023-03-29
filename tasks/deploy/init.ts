import { task } from "hardhat/config";

import testConfluxConfig from "./constants/testConfluxConfig";


task("deploy:confluxInit", "Deploys confluxTestnet init").setAction(async function (
  taskArguments,
  { ethers }
) {

  const CONFLUX_CONFIG = testConfluxConfig;
  const minter = await ethers.getContractAt("Minter", "0x82D431A1156274A597bd35825EBE59d2AEB35A25")

//   Initial veVELO distro
  await minter.initialize(
    CONFLUX_CONFIG.partnerAddrs,
    CONFLUX_CONFIG.partnerAmts,
    CONFLUX_CONFIG.partnerMax
  );
  console.log("veVELO distributed");

  await minter.setTeam(CONFLUX_CONFIG.teamMultisig)
  console.log("Team set for minter");
  
  console.log("conflux contracts Init");
});
