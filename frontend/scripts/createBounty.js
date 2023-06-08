import { ethers } from "ethers";
import { abi } from "../constanst";

export default async function createBounty(
  arbiterAddress,
  ownerUserName,
  issueId,
  repo,
  issueUrl,
  value
) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // Request access to the MetaMask account
  await window.ethereum.enable();

  // Get the signer's address
  const signerAddress = (await provider.listAccounts())[0];
  console.log(signerAddress);

  // Create an instance of the signer using the provider and signer's address
  const signer = provider.getSigner(signerAddress);
  console.log(signer);

  console.log("estoy trabajando");
  //EscrowFactory address

  const contractAddress = "0x452fDfDEDf8b1F7Bc815d5E5433a768A7579fa6F";

  const contract = new ethers.Contract(contractAddress, abi, signer);
  console.log("estoy trabajando 2");

  // Convert the value to the appropriate format for Ethereum (wei)
  const valueInWei = ethers.utils.parseEther(value.toString());

  const tx = await contract.createEscrow(
    arbiterAddress,
    ownerUserName,
    issueId,
    repo,
    issueUrl,
    {
      value: valueInWei,
    }
  );
  console.log("estoy trabajando 3");

  await tx.wait(1);
  console.log("Created Bounty");
}
