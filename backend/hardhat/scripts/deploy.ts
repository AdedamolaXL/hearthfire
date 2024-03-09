import { ethers } from "hardhat";

async function main() {
  const GoalTracker = await ethers.getContractFactory('GoalTracker');
  const goalTracker = await GoalTracker.deploy();

  await goalTracker.waitForDeployment();

  console.log('GoalTracker deployed to:', goalTracker.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
