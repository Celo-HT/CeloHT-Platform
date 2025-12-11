// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CeloHTCore is Ownable {
    mapping(address => bool) public registeredUsers;

    event UserRegistered(address indexed user);

    function registerUser(address user) external onlyOwner {
        registeredUsers[user] = true;
        emit UserRegistered(user);
    }

    function isUserRegistered(address user) external view returns (bool) {
        return registeredUsers[user];
    }
}