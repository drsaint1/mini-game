import hre from "hardhat";
const { ethers } = hre;

async function main() {
  console.log("🚀 Deploying All Contracts to Etherlink Testnet\n");

  const [deployer] = await ethers.getSigners();
  console.log("👤 Deploying with account:", deployer.address);

  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "ETH\n");

  try {
    console.log("📦 Deploying RacingToken contract...");
    const RacingToken = await ethers.getContractFactory("RacingToken");

    const tokenContract = await RacingToken.deploy();
    await tokenContract.waitForDeployment();

    const tokenAddress = await tokenContract.getAddress();
    console.log("✅ RacingToken deployed to:", tokenAddress);

    console.log("📦 Deploying EtherlinkRacing contract...");
    const EtherlinkRacing = await ethers.getContractFactory("EtherlinkRacing");

    const racingContract = await EtherlinkRacing.deploy();
    await racingContract.waitForDeployment();

    const racingAddress = await racingContract.getAddress();
    console.log("✅ EtherlinkRacing deployed to:", racingAddress);

    console.log("\n📦 Deploying EtherlinkTournaments contract...");
    const EtherlinkTournaments = await ethers.getContractFactory(
      "EtherlinkTournaments"
    );

    const tournamentsContract = await EtherlinkTournaments.deploy(
      racingAddress
    );
    await tournamentsContract.waitForDeployment();

    const tournamentsAddress = await tournamentsContract.getAddress();
    console.log("✅ EtherlinkTournaments deployed to:", tournamentsAddress);

    console.log("\n🔗 Linking contracts...");

    const setTournamentTx = await racingContract.setTournamentContract(
      tournamentsAddress
    );
    await setTournamentTx.wait();
    console.log("✅ Tournament contract linked to Racing contract");

    const setTokenTx = await racingContract.setRacingToken(tokenAddress);
    await setTokenTx.wait();
    console.log("✅ Token contract linked to Racing contract");

    const setMinterTx = await tokenContract.addAuthorizedMinter(racingAddress);
    await setMinterTx.wait();
    console.log("✅ Racing contract set as token minter");

    console.log("\n🎯 Complete Deployment Summary:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🪙 RacingToken Contract:", tokenAddress);
    console.log("📋 EtherlinkRacing Contract:", racingAddress);
    console.log("📋 EtherlinkTournaments Contract:", tournamentsAddress);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    console.log("\n📝 Contract Features:");

    console.log("🪙 RacingToken (RACE):");
    console.log("   • ERC20 token for rewards");
    console.log("   • Minting controlled by Racing contract");
    console.log("   • Player token balances");
    console.log("   • Token rewards for racing");

    console.log("\n🏎️  EtherlinkRacing:");
    console.log("   • Car minting (Starter, Sport, Racing Beast)");
    console.log("   • Race result submission with token rewards");
    console.log("   • Staking system (100 XP/day)");
    console.log("   • Daily rewards & challenges");
    console.log("   • Player stats & global leaderboard");
    console.log("   • Token integration for gameplay rewards");

    console.log("\n🏆 EtherlinkTournaments:");
    console.log("   • Tournament creation & management");
    console.log("   • Entry fee collection");
    console.log("   • Prize pool distribution");
    console.log("   • Tournament leaderboards");
    console.log("   • Multi-player competition");

    console.log("\n💡 Next Steps:");
    console.log("1. Update frontend contract addresses:");
    console.log(`   • RACING_CONTRACT_ADDRESS = "${racingAddress}"`);
    console.log(`   • RACING_TOKEN_ADDRESS = "${tokenAddress}"`);
    console.log(`   • TOURNAMENTS_CONTRACT_ADDRESS = "${tournamentsAddress}"`);

    const deploymentInfo = {
      network: "etherlinkTestnet",
      timestamp: new Date().toISOString(),
      deployer: deployer.address,
      deployerBalance: ethers.formatEther(balance),
      contracts: {
        RacingToken: {
          address: tokenAddress,
          type: "ERC20 Token",
          features: ["rewards", "gameplay", "tokenomics"],
        },
        EtherlinkRacing: {
          address: racingAddress,
          type: "Main Game Contract",
          features: [
            "minting",
            "racing",
            "staking",
            "dailyRewards",
            "leaderboard",
            "tokenRewards",
          ],
        },
        EtherlinkTournaments: {
          address: tournamentsAddress,
          type: "Tournament System",
          features: [
            "tournaments",
            "entryFees",
            "prizeDistribution",
            "competition",
          ],
        },
      },
      contractLinks: {
        "Racing -> Tournaments": tournamentsAddress,
        "Racing -> Token": tokenAddress,
        "Token -> Racing": racingAddress,
      },
      gasUsed: {
        token: "Estimated ~1-2M gas",
        racing: "Estimated ~3-4M gas",
        tournaments: "Estimated ~2-3M gas",
        total: "Estimated ~6-8M gas",
      },
    };

    const fs = await import("fs");
    fs.writeFileSync(
      "deployment-split-contracts.json",
      JSON.stringify(deploymentInfo, null, 2)
    );

    console.log(
      "\n💾 Deployment info saved to: deployment-split-contracts.json"
    );

    console.log("\n🧪 Running basic functionality tests...");

    const totalPlayers = await racingContract.getTotalPlayers();
    console.log("👥 Initial players registered:", totalPlayers.toString());

    const nextCarId = await racingContract.nextCarId();
    console.log("🚗 Next car ID:", nextCarId.toString());

    const nextTournamentId = await tournamentsContract.nextTournamentId();
    console.log("🏆 Next tournament ID:", nextTournamentId.toString());

    console.log("✅ Basic tests completed successfully!");
  } catch (error) {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }
}

main()
  .then(() => {
    console.log(
      "\n🎉 ALL CONTRACTS DEPLOYED TO ETHERLINK TESTNET SUCCESSFULLY! 🎉"
    );
    console.log("Ready for complete racing game experience! 🏎️");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Script failed:", error);
    process.exit(1);
  });
