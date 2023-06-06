import { ethers } from "ethers";
import { abiConsumer } from "../constanst";

export default async function executedChainlink(
  ownerUsername,
  issueID,
  repoName
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

  const contractAddress = "0x9fce31d108988E7941F0C05328Eb1C913bC48C26";

  const contract = new ethers.Contract(contractAddress, abiConsumer, signer);
  console.log("estoy trabajando 2");

  const tx = await contract.executeRequest3([
    "repoName",
    "ownerUsername",
    "issueID",
  ]);
  console.log("estoy trabajando 3");

  await tx.wait(1);
  console.log("Chainlink executed");
}
