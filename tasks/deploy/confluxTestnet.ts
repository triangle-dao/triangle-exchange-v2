import { task } from "hardhat/config";

import testConfluxConfig from "./constants/testConfluxConfig";


task("deploy:confluxTestnet", "Deploys confluxTestnet contracts").setAction(async function (
  taskArguments,
  { ethers }
) {

  const CONFLUX_CONFIG = testConfluxConfig;

  // Load
  const [
    Velo,
    GaugeFactory,
    BribeFactory,
    PairFactory,
    Router,
    Library,
    VeArtProxy,
    VotingEscrow,
    RewardsDistributor,
    Voter,
    Minter,
    VeloGovernor,
  ] = await Promise.all([
    ethers.getContractFactory("Velo"),
    ethers.getContractFactory("GaugeFactory"),
    ethers.getContractFactory("BribeFactory"),
    ethers.getContractFactory("PairFactory"),
    ethers.getContractFactory("Router"),
    ethers.getContractFactory("VelodromeLibrary"),
    ethers.getContractFactory("VeArtProxy"),
    ethers.getContractFactory("VotingEscrow"),
    ethers.getContractFactory("RewardsDistributor"),
    ethers.getContractFactory("Voter"),
    ethers.getContractFactory("Minter"),
    ethers.getContractFactory("VeloGovernor"),
  ]);

  const velo = await Velo.deploy();
  await velo.deployed();
  console.log("Velo deployed to: ", velo.address);

  const gaugeFactory = await GaugeFactory.deploy();
  await gaugeFactory.deployed();
  console.log("GaugeFactory deployed to: ", gaugeFactory.address);

  const bribeFactory = await BribeFactory.deploy();
  await bribeFactory.deployed();
  console.log("BribeFactory deployed to: ", bribeFactory.address);

  const pairFactory = await PairFactory.deploy();
  await pairFactory.deployed();
  console.log("PairFactory deployed to: ", pairFactory.address);

  const router = await Router.deploy(pairFactory.address, CONFLUX_CONFIG.WCFX);
  await router.deployed();
  console.log("Router deployed to: ", router.address);
  console.log("Args: ", pairFactory.address, CONFLUX_CONFIG.WCFX, "\n");

  const library = await Library.deploy(router.address);
  await library.deployed();
  console.log("VelodromeLibrary deployed to: ", library.address);
  console.log("Args: ", router.address, "\n");

  const artProxy = await VeArtProxy.deploy();
  await artProxy.deployed();
  console.log("VeArtProxy deployed to: ", artProxy.address);

  const escrow = await VotingEscrow.deploy(velo.address, artProxy.address);
  await escrow.deployed();
  console.log("VotingEscrow deployed to: ", escrow.address);
  console.log("Args: ", velo.address, artProxy.address, "\n");

  const distributor = await RewardsDistributor.deploy(escrow.address);
  await distributor.deployed();
  console.log("RewardsDistributor deployed to: ", distributor.address);
  console.log("Args: ", escrow.address, "\n");

  const voter = await Voter.deploy(
    escrow.address,
    pairFactory.address,
    gaugeFactory.address,
    bribeFactory.address
  );
  await voter.deployed();
  console.log("Voter deployed to: ", voter.address);
  console.log("Args: ", 
    escrow.address,
    pairFactory.address,
    gaugeFactory.address,
    bribeFactory.address,
    "\n"
  );

  const minter = await Minter.deploy(
    voter.address,
    escrow.address,
    distributor.address
  );
  await minter.deployed();
  console.log("Minter deployed to: ", minter.address);
  console.log("Args: ", 
    voter.address,
    escrow.address,
    distributor.address,
    "\n"
  );

  const governor = await VeloGovernor.deploy(escrow.address);
  await governor.deployed();
  console.log("VeloGovernor deployed to: ", governor.address);
  console.log("Args: ", escrow.address, "\n");

  // Initialize
  await velo.initialMint(CONFLUX_CONFIG.teamEOA);
  console.log("Initial minted");

  await velo.setMinter(minter.address);
  console.log("Minter set");

  await pairFactory.setPauser(CONFLUX_CONFIG.teamMultisig);
  console.log("Pauser set");

  await escrow.setVoter(voter.address);
  console.log("Voter set");

  await escrow.setTeam(CONFLUX_CONFIG.teamMultisig);
  console.log("Team set for escrow");

  await voter.setGovernor(CONFLUX_CONFIG.teamMultisig);
  console.log("Governor set");

  await voter.setEmergencyCouncil(CONFLUX_CONFIG.teamMultisig);
  console.log("Emergency Council set");

  await distributor.setDepositor(minter.address);
  console.log("Depositor set");

  await governor.setTeam(CONFLUX_CONFIG.teamMultisig)
  console.log("Team set for governor");

  // Whitelist
  const nativeToken = [velo.address];
  const tokenWhitelist = nativeToken.concat(CONFLUX_CONFIG.tokenWhitelist);
  await voter.initialize(tokenWhitelist, minter.address);
  console.log("Whitelist set");
  
  console.log("conflux contracts deployed");
});


// Velo deployed to:  0x9815f2595bacae5E322Bc83CBFABed491a2BD320
// GaugeFactory deployed to:  0xDEf478D840cE65050f96834485Dd6996665c3E8E
// BribeFactory deployed to:  0xAADd2f5b0E48d10eb91601FA7dd56beFFf05Fa8B
// PairFactory deployed to:  0x6F98B1C8898211C806d9ef78717b6966518E99f8
// Router deployed to:  0x2C87E66Bed6CA214cA610D92d9D8A6a7E334C72f
// Args:  0x6F98B1C8898211C806d9ef78717b6966518E99f8 0x2ed3dddae5b2f321af0806181fbfa6d049be47d8
// VelodromeLibrary deployed to:  0x426CFE5eAc9AB83F325CC449854788DeF9ecb49E
// Args:  0x2C87E66Bed6CA214cA610D92d9D8A6a7E334C72f
// VeArtProxy deployed to:  0x5D7C02250fB52ccFE43DFfee46ec85b33F1635E7
// VotingEscrow deployed to:  0x9e0D089e15Ed21C3F03018B5296164724388Fa6C
// Args:  0x9815f2595bacae5E322Bc83CBFABed491a2BD320 0x5D7C02250fB52ccFE43DFfee46ec85b33F1635E7
// RewardsDistributor deployed to:  0xA352277018baD286C9fe77575f0b43f6a9d32A87
// Args:  0x9e0D089e15Ed21C3F03018B5296164724388Fa6C
// Voter deployed to:  0x36a3B9B48e56aefB4998d518159b9e252EA47dfc
// Args:  0x9e0D089e15Ed21C3F03018B5296164724388Fa6C 0x6F98B1C8898211C806d9ef78717b6966518E99f8 0xDEf478D840cE65050f96834485Dd6996665c3E8E 0xAADd2f5b0E48d10eb91601FA7dd56beFFf05Fa8B
// Minter deployed to:  0x82D431A1156274A597bd35825EBE59d2AEB35A25
// Args:  0x36a3B9B48e56aefB4998d518159b9e252EA47dfc 0x9e0D089e15Ed21C3F03018B5296164724388Fa6C 0xA352277018baD286C9fe77575f0b43f6a9d32A87
// VeloGovernor deployed to:  0x25Dd1F6FF4E42d37e065606455f83DA2e7fc7f6d
// Args:  0x9e0D089e15Ed21C3F03018B5296164724388Fa6C