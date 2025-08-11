# Somnia Racing Game - Setup Guide

Check full game documentation IN GAME_DOCUMENTATION.md

## Quick Start

This guide will help you get the Somnia Racing Game running locally in under 10 minutes.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **MetaMask** browser extension - [Install here](https://metamask.io/) or Rabby wallet, personally I prefer rabby due to smooth user experience and bug free.

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd my-somnia-game
```

Set up .env file with private key (optional for contract redeploment)

```bash
# WalletConnect Project ID

VITE_WALLETCONNECT_PROJECT_ID="WalletConnect Project ID"

# Network Configuration

VITE_SOMNIA_RPC_URL=https://dream-rpc.somnia.network/
VITE_SOMNIA_CHAIN_ID=50312

# Contract Addresses - Update these after deployment

VITE_RACING_CONTRACT_ADDRESS="new racing contract address"
VITE_RACING_TOKEN_ADDRESS="new token contract address"
VITE_TOURNAMENTS_CONTRACT_ADDRESS="new tournament contract address"
PRIVATE_KEY="your evm wallet private key without 0x prefix"
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including React, Vite, Hardhat, and Web3 libraries.

### Step 3: Configure Network

Add the Somnia Testnet to your MetaMask:

**Network Details:**

- Network Name: `Somnia Testnet`
- RPC URL: `https://dream-rpc.somnia.network/`
- Chain ID: `50312` (or auto-detect)
- Currency Symbol: `STT`

### Step 4: Get Test Tokens

1. Visit the Somnia Testnet faucet
2. Request test STT tokens for your wallet address
3. You'll need these tokens to interact with the game contracts

### Step 5: Deploy Contracts (Optional)

If you want to deploy fresh contracts:

```bash
# Compile contracts
npx hardhat compile

# Deploy to Somnia Testnet
npx hardhat run scripts/deploy-contracts.js --network somniaTestnet
```

**Note:** The game is already configured with pre-deployed contracts, so this step is optional. The script automatically updates the .env file with new contracts.

### Step 6: Start the Development Server

```bash
npm run dev
```

The game will be available at `http://localhost:5173` or any available port as at the time of deployment.

### Step 7: Connect Your Wallet

1. Open the game in your browser
2. Click "Connect Wallet"
3. Approve the MetaMask connection
4. It automatically connect to Somnia test network if you have it added in your wallet, if not, it will request approval to add the network.

### Step 8: Start Playing

1. **Mint your first car** - Click "mint starter racer on the welcome page" to purchase a starter car (0.01 STT)
2. **Enter a race** - Go to "Main Menu" and click "Start Race"
3. **Earn rewards** - Complete races to earn RACE tokens and XP
4. **Check leaderboard** - View your stats and compete with others

## Troubleshooting

### Common Issues

**"Wrong Network" Error:**

- Switch to Somnia Testnet in MetaMask or Rabby wallet.
- Refresh the page

**Transaction Fails:**

- Ensure you have enough STT for gas fees
- Try increasing gas limit in MetaMask

**Game Won't Load:**

- Clear browser cache
- Disable ad blockers
- Try a different browser

**Can't Connect Wallet:**

- Update MetaMask to latest version or use rabby wallet preferrably
- Check if MetaMask is unlocked
- Try refreshing the page

### Network Configuration Issues

If you can't connect to Somnia Testnet:

1. Manually add the network in MetaMask:

   - Settings → Networks → Add Network
   - Use the network details from Step 3

2. Import the network configuration:
   ```javascript
   {
     "chainId": "50312",
     "chainName": "Somnia Testnet",
     "rpcUrls": ["https://dream-rpc.somnia.network/"],
     "nativeCurrency": {
       "name": "STT",
       "symbol": "STT",
       "decimals": 18
     }
   }
   ```

## Advanced Setup

### Running Tests

```bash
# Run contract tests
npx hardhat test

# Run with coverage
npx hardhat coverage
```

### Building for Production

```bash
# Build the application
npm run build

# Preview the build
npm run preview
```

### Contract Verification

To verify contracts on Somnia explorer:

```bash
npx hardhat verify --network somniaTestnet <CONTRACT_ADDRESS>
```

## Support

If you encounter any issues during setup:

1. Check the browser console for error messages
2. Verify network configuration in MetaMask
3. Ensure you have sufficient test STT tokens
4. Try clearing browser cache and hard refresh

## Architecture Overview

The game consists of:

- **Frontend**: React + TypeScript + Vite
- **Smart Contracts**: Solidity contracts on Somnia
- **Web3 Integration**: Wagmi + Viem for blockchain interaction
- **3D Graphics**: Three.js for racing visualization

Check full game documentation IN GAME_DOCUMENTATION.md
Ready to race? Let's go! 🏎️
