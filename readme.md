# Velodrome

This repo contains the contracts for Velodrome Finance, an AMM on Optimism inspired by Solidly.

## Testing

This repo uses both Foundry (for Solidity testing) and Hardhat (for deployment).

Foundry Setup

```ml
forge init
forge build
forge test
```

Hardhat Setup

```ml
npm i
npx hardhat compile
```

```
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
```
