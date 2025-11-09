// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FitCoinToken is ERC20, Ownable {
    // Evento cuando alguien completa una actividad
    event ActivityCompleted(
        address indexed user,
        string activityName,
        uint256 tokensEarned,
        uint256 timestamp
    );
    
    // Evento cuando alguien canjea recompensa
    event RewardRedeemed(
        address indexed user,
        string rewardName,
        uint256 tokensBurned,
        uint256 timestamp
    );

    constructor() ERC20("FitCoin", "FIT") Ownable(msg.sender) {
        // Mintear supply inicial al creador
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // Función para registrar actividad y ganar tokens
    function logActivity(string memory activityName, uint256 tokensToEarn) external {
        require(tokensToEarn > 0, "Tokens must be greater than 0");
        require(tokensToEarn <= 100 * 10 ** decimals(), "Max 100 tokens per activity");
        
        // Mintear tokens al usuario
        _mint(msg.sender, tokensToEarn);
        
        // Emitir evento
        emit ActivityCompleted(msg.sender, activityName, tokensToEarn, block.timestamp);
    }

    // Función para canjear recompensa (quemar tokens)
    function redeemReward(string memory rewardName, uint256 tokensToBurn) external {
        require(tokensToBurn > 0, "Tokens must be greater than 0");
        require(balanceOf(msg.sender) >= tokensToBurn, "Insufficient balance");
        
        // Quemar tokens del usuario
        _burn(msg.sender, tokensToBurn);
        
        // Emitir evento
        emit RewardRedeemed(msg.sender, rewardName, tokensToBurn, block.timestamp);
    }

    // Función para que el owner pueda mintear tokens (opcional)
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}