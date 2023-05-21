const hre = require("hardhat");

async function main() {


    // DEPLOY MAIN CONTRACT
    const Main = await hre.ethers.getContractFactory("Main");
	const main = await Main.deploy();
	await main.deployed();
	console.log("Main deployed to:", main.address);
    
    // DEPLOY FUNCTION CONSUMER FOR ESCROWS TO INTERACT WITH
    const oracleAddress = "0xeA6721aC65BCeD841B8ec3fc5fEdeA6141a0aDE4"; //For Mumbai
    const [owner, otherAccount] = await ethers.getSigners();
    const provider = new ethers.providers.JsonRpcProvider(
      "https://polygon-mumbai.g.alchemy.com/v2/WGlYvVraJOmI2Fd18AXx-lJ_mxsISz0w"
    );
    const networkId = await provider.getNetwork();
    console.log("Network ID:", networkId.chainId);

    const contractName = "FunctionsConsumerEscrow";
  
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const consumerContract = await ethers.getContractFactory(contractName);
    console.log("hey ya");
  
    const deployedContract = await consumerContract.deploy(
      //`${oracleAddress}`//, `${arbiter}`
      "0xeA6721aC65BCeD841B8ec3fc5fEdeA6141a0aDE4"
    );
    //const deployedContract = await consumerContract.connect(arbiter).deploy("0xeA6721aC65BCeD841B8ec3fc5fEdeA6141a0aDE4", arbiter);
    console.log("Deployed Functions Consumer address:", deployedContract.address);


    // CREATE THREE ESCROW CONTRACTS THROUGH MAIN, AS OTHERACCOUNT (NOT OWNER)

    // CALL METHOD IN MAIN TO INITIATE ALL ESCROWS FETCHING DATA VIA FUNCTIONS_CONSUMER_ESCROW
        // SIMULATES THIS METHOD BEING CALLED BY CHAINLINK AUTOMATION
        // PRINT OUT DATA RETURNED BY FUNCTIONS


  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  