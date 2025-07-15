const { ethers } = require("hardhat");

async function main() {
  const FundMe = await ethers.getContractFactory("FundMe");
  const fundMe = await FundMe.deploy();

  await fundMe.waitForDeployment();
  console.log("✅ FundMe contract deployed at:", fundMe.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// C:\Users\conta\OneDrive\Desktop\FundMe\FundMe_dAPP\blockchain"