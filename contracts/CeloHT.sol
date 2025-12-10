// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CeloHT is Ownable {
    struct Course {
        string title;
        string ipfsCID;
        uint256 timestamp;
    }
    mapping(uint256 => Course) public courses;
    uint256 public courseCount;

    struct Agent {
        address wallet;
        string name;
        bool verified;
    }
    mapping(address => Agent) public agents;

    struct Tree {
        string ipfsCID;
        uint256 timestamp;
        address plantedBy;
    }
    mapping(uint256 => Tree) public trees;
    uint256 public treeCount;

    event CourseAdded(uint256 indexed id, string title, string ipfsCID);
    event AgentRegistered(address indexed wallet, string name);
    event TreePlanted(uint256 indexed id, string ipfsCID, address indexed plantedBy);

    function addCourse(string memory _title, string memory _ipfsCID) external onlyOwner {
        courseCount++;
        courses[courseCount] = Course(_title, _ipfsCID, block.timestamp);
        emit CourseAdded(courseCount, _title, _ipfsCID);
    }

    function registerAgent(address _wallet, string memory _name) external onlyOwner {
        agents[_wallet] = Agent(_wallet, _name, false);
        emit AgentRegistered(_wallet, _name);
    }

    function verifyAgent(address _wallet) external onlyOwner {
        agents[_wallet].verified = true;
    }

    function plantTree(string memory _ipfsCID, address _plantedBy) external onlyOwner {
        treeCount++;
        trees[treeCount] = Tree(_ipfsCID, block.timestamp, _plantedBy);
        emit TreePlanted(treeCount, _ipfsCID, _plantedBy);
    }
}