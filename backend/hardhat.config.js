require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("dotenv").config();
require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;
const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL;
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL;
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const POLYGON_MUMBAI_RPC_URL = process.env.POLYGON_MUMBAI_RPC_URL;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.9",
      },
      {
        version: "0.4.24",
      },
      {
        version: "0.6.12",
      },
      {
        version: "0.4.19",
      },
      {
        version: "0.6.6",
      },
      {
        version: "0.7.6",
      },
    ],
  },

  defaultNetwork: "hardhat",

  networks: {
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
      forking: {
        url: MAINNET_RPC_URL,
      },
    },
    localhost: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },

    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
      blockConfirmation: 6,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmation: 6,
      allowUnlimitedContractSize: true,
    },
    polygon: {
      url: POLYGON_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 137,
      blockConfirmation: 6,
    },
    polygonMumbai: {
      url: POLYGON_MUMBAI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 80001,
      blockConfirmation: 6,
      allowUnlimitedContractSize: true,
    },
  },

  etherscan: {
    apiKey: /*ETHERSCAN_API_KEY,*/ POLYGONSCAN_API_KEY, //cambiar para polygon
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "EUR",
    coinmarketcap: COINMARKETCAP_API_KEY,
    /*token: "matic",*/
  },
  //! Cuando llamamos a getNamedAccounts() de hardhat, esta acudiendo aquí para ver los nombres de las cuentas.
  //! la Deployer, será po defecto la primera cuenta y asignada a deployer.
  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      default: 1,
    },
  },
  mocha: {
    timeout: 500000, // 500 seconds max for running tests
  },
  plugins: ["hardhat-deploy"],
};
