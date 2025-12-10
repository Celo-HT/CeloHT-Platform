#!/bin/bash
set -e
echo "=============================="
echo "CeloHT Full Pipeline Starting"
echo "=============================="

# Dependencies
command -v npx >/dev/null 2>&1 || { echo >&2 "npx required but not installed. Aborting."; exit 1; }
command -v node >/dev/null 2>&1 || { echo >&2 "Node.js required but not installed. Aborting."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo >&2 "npm required but not installed. Aborting."; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo >&2 "Python3 required but not installed. Aborting."; exit 1; }

# Compile
echo "Compiling contracts..."
npx hardhat compile

# Smart Contract Tests
echo "Running smart contract tests..."
npx hardhat test

# API Tests
echo "Running API tests..."
npx mocha tests/api/**/*.test.js

# Subgraph Tests
echo "Running Subgraph tests..."
npx mocha tests/subgraph/**/*.test.js

# IPFS Tests
echo "Running IPFS tests..."
npx mocha tests/ipfs/**/*.test.js

# Audit
echo "Running Solidity audit..."
pip install --user slither-analyzer mythril
npx slither contracts/CeloHT.sol --json slither-results.json
npx myth analyze contracts/CeloHT.sol -o json -f mythril-results.json

# Deploy
echo "Deploying contracts..."
npx hardhat run scripts/deploy.js --network localhost

# IPFS Upload
echo "Uploading sample file to IPFS..."
node -e "
const IPFS = require('ipfs-http-client');
const ipfs = IPFS.create({url: 'http://localhost:5001'});
(async () => {
  const { cid } = await ipfs.add('CeloHT test file for pipeline');
  console.log('Sample file uploaded to IPFS CID:', cid.toString());
})();
"

echo "=============================="
echo "CeloHT Full Pipeline Completed Successfully"
echo "=============================="