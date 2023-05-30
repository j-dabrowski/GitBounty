const hre = require("hardhat");
const fs = require('fs').promises;

async function main() {
    const [owner, otherAccount] = await ethers.getSigners();

    const mainResults = await deploy_main();
    const main = mainResults[0];
    const mainAddress = mainResults[1];

    await escrow_tests(owner, main);

    await setup_consumer(mainAddress)

}

async function deploy_main() {
    // DEPLOY MAIN CONTRACT
    const Main = await hre.ethers.getContractFactory("Main");
	const main = await Main.deploy();
	await main.deployed();
	console.log("Main deployed to:", main.address);
    
    const mainAddress = ethers.utils.getAddress(main.address);

    return [main, mainAddress];
}

async function escrow_tests(owner, main) {
    // Check if Escrows is empty
    const EscrowsIsEmpty1 = await main.EscrowsIsEmpty();
    console.log("EscrowsIsEmpty", EscrowsIsEmpty1);

    // Deploy Escrow via Main
    const result = await main.createEscrow(owner.address, "testName", "19", "notional");
    const receipt = await result.wait();
    //console.log(receipt);
    console.log("Escrow should now be created and present in Escrows");

    // Check if Escrows is empty
    const EscrowsIsEmpty2 = await main.EscrowsIsEmpty();
    console.log("EscrowsIsEmpty", EscrowsIsEmpty2);

    // Get address from the struct just added to Escrows
    const escrow = await main.Escrows(0);
    const escrowAddress = escrow.escrowContract;
    console.log("Escrow address is:", escrowAddress, escrowAddress.length, typeof(escrowAddress));

    // Check if isEscrow returns true for the address of the Escrow we just made, and false for a random address
    const EscrowIsEscrow = await main.isEscrow(escrowAddress);
    const OtherIsEscrow = await main.isEscrow("0xCC1ddA58ec286dbb5deA3D2B377A9cFcCF924a5a");
    console.log("EscrowIsEscrow", EscrowIsEscrow);
    console.log("OtherIsEscrow", OtherIsEscrow);
}

async function setup_consumer(mainAddress) {
    // DEPLOY FUNCTION CONSUMER FOR ESCROWS TO INTERACT WITH

    //const mainAddress = ethers.utils.getAddress("0x47ba4b430f995c6d62793E9fBB25Bd4d0ff2259E");
    console.log(mainAddress);
    //!I have hardcoded the oracleAddress as is was not working with the Const name
    const oracleAddress = ethers.utils.getAddress("0xeA6721aC65BCeD841B8ec3fc5fEdeA6141a0aDE4"); //For Mumbai.No change if used Mumbai
    console.log(oracleAddress);
    
    // Set up source to be passed into Consumer constructor
    const sourcePath = './FR-source-GitHub.js'; // path to CLFunctions source file
    const source = await fs.readFile(sourcePath, "utf8");
  
    const [owner, otherAccount] = await ethers.getSigners();
    const provider = new ethers.providers.JsonRpcProvider(
      "https://polygon-mumbai.g.alchemy.com/v2/WGlYvVraJOmI2Fd18AXx-lJ_mxsISz0w"
    );
    const networkId = await provider.getNetwork();
    console.log("Network ID:", networkId.chainId);
    // Set your contract name.
    const contractName = "FunctionsConsumerEscrow";
    //const contractName = "MyFirstContract"
    // Set up the signer using your private key for the Polygon Mumbai network
  
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const consumerContract = await ethers.getContractFactory(contractName);
    console.log("hey ya");
  
  
    // DEPLOY CONSUMER
    const deployedContract = await consumerContract.deploy(
      oracleAddress, 
      mainAddress,
      `${source}`
      );
    //const deployedContract = await consumerContract.connect(arbiter).deploy("0xeA6721aC65BCeD841B8ec3fc5fEdeA6141a0aDE4", arbiter);
  
    console.log("Deployed Functions Consumer address:", deployedContract.address);


        /// Set consumer address in main
        /// Call CLfunctions via deployed consumer
        /// Call CLFunctions via one of the escrows
        /// See how to store values in consumer and get them to escrow, edit source script to return correct data

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  