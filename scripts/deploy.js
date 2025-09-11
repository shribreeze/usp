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

  // Create subscription plans
  const silverPrice = hre.ethers.parseEther("0.0000001"); // 0.0000001 STT per second
  await subscriptionManager.createPlan("Silver Plan", silverPrice);
  console.log("Silver plan created");
  
  const goldPrice = hre.ethers.parseEther("0.00001"); // 0.00001 STT per second
  await subscriptionManager.createPlan("Gold Plan", goldPrice);
  console.log("Gold plan created");
  
  // Create AI pay-per-use plan
  const aiPrice = hre.ethers.parseEther("0.000001"); // 0.000001 STT per AI request
  await subscriptionManager.createPlan("AI Pay-Per-Use", aiPrice);
  console.log("AI pay-per-use plan created");

  console.log("\n=== Deployment Complete ===");
  console.log("NFTAccessPass:", await nftAccessPass.getAddress());
  console.log("SubscriptionManager:", await subscriptionManager.getAddress());
  console.log("\nUpdate lib/config.ts with these addresses!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});