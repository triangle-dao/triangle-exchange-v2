const { ethers } = require("hardhat");


async function main() { 
    mUSDC = "0xb1aebed41999273366e38e1858680f2574f521f9" 
    mAUSD = "0xcea2b4d593b87fab8352e9f08d809a06a205da9f"

    const PairFactory = await ethers.getContractAt(
      "PairFactory",
      "0x6F98B1C8898211C806d9ef78717b6966518E99f8"
    );

    USDC = await ethers.getContractAt(
        "MockERC20",
        mUSDC
    );

    AUSD = await ethers.getContractAt(
        "MockERC20",
        mAUSD
    );

    // await PairFactory.createPair(mUSDC,mAUSD, true);
    poolAddress = await PairFactory.getPair(mUSDC,mAUSD, true)
    console.log(poolAddress)
    
    AmontIn = ethers.utils.parseEther("100")
    const Router = await ethers.getContractAt(
        "Router",
        "0x2C87E66Bed6CA214cA610D92d9D8A6a7E334C72f"
    );

    await USDC.approve(Router.address, AmontIn);
    await AUSD.approve(Router.address, AmontIn);

    await Router.addLiquidity(
        mUSDC,
        mAUSD,
        true,
        "100",
        "100",
        0,
        0,
        "0x790ac11183ddE23163b307E3F7440F2460526957",
        "1743520698000",
        {gasLimit: 1000000}
    )

}
  
main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
});