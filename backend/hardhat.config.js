require('@nomicfoundation/hardhat-toolbox');
require("@chainlink/env-enc").config()

module.exports = {
	solidity: {
		version: "0.8.9",
		settings: {
			optimizer: {
				enabled: true
			}
		}
	},
	allowUnlimitedContractSize: true,
	networks: {
		hardhat: {},
		POLYGON_MUMBAI: {
			accounts: [`${process.env.PRIVATE_KEY}`],
			url: `${process.env.POLYGON_MUMBAI_RPC_URL}`
		}
	}
}

