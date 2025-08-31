const hre = require("hardhat");

async function main() {
  console.log("Deploying USP contracts to Somnia...");

  // Deploy NFT Access Pass first
  const NFTAccessPass = await hre.ethers.getContractFactory("NFTAccessPass");
  const nftAccessPass = await NFTAccessPass.deploy();
  await nftAccessPass.waitForDeployment();
  
  console.log("NFTAccessPass deployed to:", await nftAccessPass.getAddress());

  // Deploy Subscription Manager
  const SubscriptionManager = await hre.ethers.getContractFactory("SubscriptionManager");
  const subscriptionManager = await SubscriptionManager.deploy(await nftAccessPass.getAddress());
  await subscriptionManager.waitForDeployment();
  
  console.log("SubscriptionManager deployed to:", await subscriptionManager.getAddress());

  // Set subscription manager in NFT contract
  await nftAccessPass.setSubscriptionManager(await subscriptionManager.getAddress());
  console.log("NFT contract configured with SubscriptionManager");

  // Create a sample plan
  const pricePerSecond = hre.ethers.parseEther("0.0000001"); // 0.0000001 STT per second
  await subscriptionManager.createPlan("Premium Plan", pricePerSecond);
  console.log("Sample plan created");

  console.log("\n=== Deployment Complete ===");
  console.log("NFTAccessPass:", await nftAccessPass.getAddress());
  console.log("SubscriptionManager:", await subscriptionManager.getAddress());
  console.log("\nUpdate lib/config.ts with these addresses!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});