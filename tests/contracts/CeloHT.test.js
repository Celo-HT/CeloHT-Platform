const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CeloHT Contract", function () {
  let CeloHT, celoht, owner, addr1;

  beforeEach(async function () {
    CeloHT = await ethers.getContractFactory("CeloHT");
    [owner, addr1] = await ethers.getSigners();
    celoht = await CeloHT.deploy();
    await celoht.deployed();
  });

  it("Should add a course", async function () {
    await celoht.addCourse("Blockchain 101", "QmCID123");
    const course = await celoht.courses(1);
    expect(course.title).to.equal("Blockchain 101");
    expect(course.ipfsCID).to.equal("QmCID123");
  });

  it("Should register and verify an agent", async function () {
    await celoht.registerAgent(addr1.address, "Alice");
    let agent = await celoht.agents(addr1.address);
    expect(agent.name).to.equal("Alice");
    expect(agent.verified).to.equal(false);

    await celoht.verifyAgent(addr1.address);
    agent = await celoht.agents(addr1.address);
    expect(agent.verified).to.equal(true);
  });

  it("Should plant a tree", async function () {
    await celoht.plantTree("QmTreeCID", addr1.address);
    const tree = await celoht.trees(1);
    expect(tree.ipfsCID).to.equal("QmTreeCID");
    expect(tree.plantedBy).to.equal(addr1.address);
  });
});