require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    holesky_testnet: {
      url: "https://holesky.drpc.org",
      accounts: ["9fb877bebc2e049c7addcd1d2a4c6ae2a2bc67a0a1639769106b840c923e0dda"],
      chainId: 17000,
    },
    bitkubchain:{
      url: "https://rpc-testnet.bitkubchain.io",
      accounts: ["9fb877bebc2e049c7addcd1d2a4c6ae2a2bc67a0a1639769106b840c923e0dda"],
      chainId: 25925,
    },
    zetachain:{
      url: "https://zeta-chain-testnet.drpc.org",
      accounts: ["9fb877bebc2e049c7addcd1d2a4c6ae2a2bc67a0a1639769106b840c923e0dda"],
      chainId: 7001,
    },
    binance:{
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: ["9fb877bebc2e049c7addcd1d2a4c6ae2a2bc67a0a1639769106b840c923e0dda"],
      chainId: 97,
    },
  },
  etherscan: {
    apiKey: "P51EKXN8W2HFT5CAN5YC5W4RC1EVBIWJJR",
    customChains: [
      {
        network: "zetachain",
        chainId: 7001,
        urls: {
          apiURL: "https://rpc.ankr.com/zetachain_tendermint_athens_testnet",
          browserURL: "https://explorer.zetachain.io",
        },
      }
    ]
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
};

// Create a new task to verify contracts on the custom chain
task("verify-contract", "Verify contract on the custom chain")
  .addParam("contract", "The contract name to verify")
  .addParam("address", "The contract address to verify")
  .setAction(async (taskArgs) => {
    const { contract, address } = taskArgs;
    const networkName = "myCustomChain";

    try {
      await run("verify:verify", {
        address,
        constructorArguments: [],
        contract: contract,
      });
      console.log(`Contract ${contract} verified on ${networkName} at ${address}`);
    } catch (error) {
      console.error(`Error verifying contract ${contract} on ${networkName}: ${error.message}`);
    }
  });