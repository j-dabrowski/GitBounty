import { ethers } from "ethers";
import { abi } from "../constanst";

export default async function addDeveloper(developerAddress, loginNameGithub) {
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

  const contractAddress = "0x742B99d37532985ab0024b461c2395969a58a7f8";

  const contract = new ethers.Contract(contractAddress, abi, signer);
  console.log("estoy trabajando 2");

  const tx = await contract.addDeveloper(developerAddress, loginNameGithub);
  console.log("estoy trabajando 3");

  await tx.wait(1);
  console.log("Developer added to Array of MainContract");
}
