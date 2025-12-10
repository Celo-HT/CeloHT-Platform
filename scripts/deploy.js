const hre = require("hardhat");

async function main() {
  const CeloHT = await hre.ethers.getContractFactory("CeloHT");
  const celoht = await CeloHT.deploy();
  await celoht.deployed();
  console.log("CeloHT deployed to:", celoht.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});