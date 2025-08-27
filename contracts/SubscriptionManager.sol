// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./NFTAccessPass.sol";

contract SubscriptionManager is ReentrancyGuard, Ownable {
    struct Plan {
        uint256 pricePerSecond;
        bool active;
        string name;
    }
    
    struct Subscription {
        uint256 planId;
        uint256 balance;
        uint256 lastUpdate;
        bool active;
    }
    
    mapping(uint256 => Plan) public plans;
    mapping(address => Subscription) public subscriptions;
    uint256 public nextPlanId = 1;
    
    NFTAccessPass public nftContract;
    
    event PlanCreated(uint256 indexed planId, string name, uint256 pricePerSecond);
    event Subscribed(address indexed user, uint256 indexed planId, uint256 amount);
    event Cancelled(address indexed user, uint256 indexed planId);
    event BalanceUpdated(address indexed user, uint256 newBalance);
    
    constructor(address _nftContract) Ownable(msg.sender) {
        nftContract = NFTAccessPass(_nftContract);
    }
    
    function createPlan(string memory _name, uint256 _pricePerSecond) external onlyOwner {
        plans[nextPlanId] = Plan(_pricePerSecond, true, _name);
        emit PlanCreated(nextPlanId, _name, _pricePerSecond);
        nextPlanId++;
    }
    
    function subscribe(uint256 _planId) external payable nonReentrant {
        require(plans[_planId].active, "Plan not active");
        require(msg.value > 0, "Must send payment");
        
        Subscription storage sub = subscriptions[msg.sender];
        
        if (sub.active) {
            _updateBalance(msg.sender);
            sub.balance += msg.value;
        } else {
            sub.planId = _planId;
            sub.balance = msg.value;
            sub.lastUpdate = block.timestamp;
            sub.active = true;
            nftContract.mint(msg.sender);
        }
        
        emit Subscribed(msg.sender, _planId, msg.value);
    }
    
    function cancel() external nonReentrant {
        Subscription storage sub = subscriptions[msg.sender];
        require(sub.active, "No active subscription");
        
        _updateBalance(msg.sender);
        
        if (sub.balance > 0) {
            payable(msg.sender).transfer(sub.balance);
        }
        
        sub.active = false;
        nftContract.burn(msg.sender);
        
        emit Cancelled(msg.sender, sub.planId);
    }
    
    function _updateBalance(address _user) internal {
        Subscription storage sub = subscriptions[_user];
        if (!sub.active) return;
        
        uint256 timeElapsed = block.timestamp - sub.lastUpdate;
        uint256 cost = timeElapsed * plans[sub.planId].pricePerSecond;
        
        if (cost >= sub.balance) {
            sub.balance = 0;
            sub.active = false;
            nftContract.burn(_user);
        } else {
            sub.balance -= cost;
        }
        
        sub.lastUpdate = block.timestamp;
        emit BalanceUpdated(_user, sub.balance);
    }
    
    function updateBalance(address _user) external {
        _updateBalance(_user);
    }
    
    function checkAccess(address _user) external view returns (bool) {
        Subscription memory sub = subscriptions[_user];
        if (!sub.active) return false;
        
        uint256 timeElapsed = block.timestamp - sub.lastUpdate;
        uint256 cost = timeElapsed * plans[sub.planId].pricePerSecond;
        
        return cost < sub.balance;
    }
    
    function getSubscription(address _user) external view returns (Subscription memory) {
        return subscriptions[_user];
    }
    
    function getPlan(uint256 _planId) external view returns (Plan memory) {
        return plans[_planId];
    }
}