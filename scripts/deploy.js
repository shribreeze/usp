const hre = require("hardhat");

async function main() {
  console.log("Deploying USP contracts to Somnia...");

  // Deploy NFT Access Pass first
  const NFTAccessPass = await hre.ethers.getContractFactory("NFTAccessPass");
  const nftAccessPass = await NFTAccessPass.deploy();
  await nftAccessPass.deployed();
  
  console.log("NFTAccessPass deployed to:", nftAccessPass.address);

  // Deploy Subscription Manager
  const SubscriptionManager = await hre.ethers.getContractFactory("SubscriptionManager");
  const subscriptionManager = await SubscriptionManager.deploy(nftAccessPass.address);
  await subscriptionManager.deployed();
  
  console.log("SubscriptionManager deployed to:", subscriptionManager.address);

  // Set subscription manager in NFT contract
  await nftAccessPass.setSubscriptionManager(subscriptionManager.address);
  console.log("NFT contract configured with SubscriptionManager");

  // Create a sample plan
  const pricePerSecond = hre.ethers.utils.parseEther("0.000001"); // 0.000001 ETH per second
  await subscriptionManager.createPlan("Premium Plan", pricePerSecond);
  console.log("Sample plan created");

  console.log("\n=== Deployment Complete ===");
  console.log("NFTAccessPass:", nftAccessPass.address);
  console.log("SubscriptionManager:", subscriptionManager.address);
  console.log("\nUpdate lib/config.ts with these addresses!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});