import { ethers } from "ethers";
import { abi } from "../constanst";

export default async function deleteEscrowArray(escrowContractAddress) {
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

  const contractAddress = "0x3b03C7A681BAa8d506FE2d540841f5c76e242697";

  const contract = new ethers.Contract(contractAddress, abi, signer);
  console.log("estoy trabajando 2");

  const tx = await contract.deleteEscrowArray(escrowContractAddress);
  console.log("estoy trabajando 3");

  await tx.wait(1);
  console.log("Bounty Cancelled and money back to Depositor");
}
