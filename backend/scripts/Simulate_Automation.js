const hre = require("hardhat");

async function main() {

    const [owner, otherAccount] = await ethers.getSigners();

    // DEPLOY MAIN CONTRACT
    const Main = await hre.ethers.getContractFactory("Main");
	const main = await Main.deploy();
	await main.deployed();
	console.log("Main deployed to:", main.address);
    
    // Check if Escrows is empty
    const EscrowsIsEmpty1 = await main.EscrowsIsEmpty();
    console.log("EscrowsIsEmpty", EscrowsIsEmpty1);

    // Deploy Escrow via Main
    const result = await main.createEscrow(owner.address, 'testName', 19);
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


async function main2() {
    
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
  