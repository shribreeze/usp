// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTAccessPass is ERC721, Ownable {
    uint256 private _tokenIdCounter = 1;
    mapping(address => uint256) public userTokens;
    
    address public subscriptionManager;
    
    modifier onlySubscriptionManager() {
        require(msg.sender == subscriptionManager, "Only subscription manager");
        _;
    }
    
    constructor() ERC721("USP Access Pass", "USPAP") Ownable(msg.sender) {}
    
    function setSubscriptionManager(address _manager) external onlyOwner {
        subscriptionManager = _manager;
    }
    
    function mint(address _to) external onlySubscriptionManager {
        require(userTokens[_to] == 0, "User already has token");
        
        uint256 tokenId = _tokenIdCounter++;
        userTokens[_to] = tokenId;
        _mint(_to, tokenId);
    }
    
    function burn(address _user) external onlySubscriptionManager {
        uint256 tokenId = userTokens[_user];
        if (tokenId > 0) {
            userTokens[_user] = 0;
            _burn(tokenId);
        }
    }
    
    function hasAccess(address _user) external view returns (bool) {
        return userTokens[_user] > 0;
    }
    
    function tokenURI(uint256 tokenId) public pure override returns (string memory) {
        return "data:application/json;base64,eyJuYW1lIjoiVVNQIEFjY2VzcyBQYXNzIiwiZGVzY3JpcHRpb24iOiJVbml2ZXJzYWwgU3Vic2NyaXB0aW9uIFByb3RvY29sIEFjY2VzcyBQYXNzIiwiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlNakF3SWlCb1pXbG5hSFE5SWpJd01DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklpQjJhV1YzUW05NFBTSXdJREFnTWpBd0lESXdNQ0krUEhKbFkzUWdkMmxrZEdnOUlqSXdNQ0lnYUdWcFoyaDBQU0l5TURBZ0lpQm1hV3hzUFNJak1EQXpOVFJHSWk4K1BIUmxlSFFnZUQwaU1UQWlJSGs5SWpVd0lpQm1hV3hzUFNJamRHaDBJaUJtYjI1MExYTnBlbVU5SWpJd0lpQjBlWFIwTFdGdVkyaHZjajBpYldsa1pHeGxJajVWVTFBZ1FXTmpaWE56SUZCaGMzTThMM1JsZUhRK1BDOXpkbWMrIn0=";
    }
}