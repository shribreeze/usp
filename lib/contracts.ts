export const SUBSCRIPTION_MANAGER_ABI = [
  "function createPlan(string memory _name, uint256 _pricePerSecond) external",
  "function subscribe(uint256 _planId) external payable",
  "function cancel() external",
  "function checkAccess(address _user) external view returns (bool)",
  "function getSubscription(address _user) external view returns (tuple(uint256 planId, uint256 balance, uint256 lastUpdate, bool active))",
  "function getPlan(uint256 _planId) external view returns (tuple(uint256 pricePerSecond, bool active, string name))",
  "function updateBalance(address _user) external",
  "event Subscribed(address indexed user, uint256 indexed planId, uint256 amount)",
  "event Cancelled(address indexed user, uint256 indexed planId)",
  "event BalanceUpdated(address indexed user, uint256 newBalance)"
] as const

export const NFT_ACCESS_PASS_ABI = [
  "function hasAccess(address _user) external view returns (bool)",
  "function userTokens(address _user) external view returns (uint256)",
  "function balanceOf(address owner) external view returns (uint256)"
] as const