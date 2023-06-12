const hre = require("hardhat");
const { ethers } = require("hardhat");
const { Wallet } = require("ethers");
const provider = hre.ethers.provider;

const wallet = new ethers.Wallet(privateKey, provider);

async function main() {
  // Deploy the Token contract.
  const Token = await ethers.getContractFactory("TokenETH");
  const token = await Token.deploy("USDT Theter", "USDT");
  await token.deployed();
  console.log("-> Token contract is deployed at: ", token.address);

  // Deploy the BRIDGE contract.
  const BridgeETH = await ethers.getContractFactory("BridgeETH");
  const bridgeEth = await BridgeETH.deploy(wallet.address, token.address);
  await bridgeEth.deployed();
  console.log("-> BridgeEth contract deployed at: ", bridgeEth.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
