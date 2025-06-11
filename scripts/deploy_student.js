const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);


  const StudentRegistry = await ethers.getContractFactory("StudentRegistry");
  const studentRegistry = await StudentRegistry.deploy();

  //await studentRegistry.deployed();

  console.log("StudentRegistry contract deployed to:", studentRegistry.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });