import { ethers } from 'ethers'
import { abi } from '../constants/index'

export default async function createBounty(arbiterAddress, value) {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  // Request access to the MetaMask account
  await window.ethereum.enable()

  // Get the signer's address
  const signerAddress = (await provider.listAccounts())[0]
  console.log(signerAddress)

  // Create an instance of the signer using the provider and signer's address
  const signer = provider.getSigner(signerAddress)
  console.log(signer)

  console.log('estoy trabajando')
  //EscrowFactory address
  const contractAddress = '0x4c4355A536F7ED40B9E72068EF1e7e4cB9C4f025'
  //const contractAddress = '0x50240AA691cCDD8F3fDE38A36E89629A371b99e3'

  const contract = new ethers.Contract(contractAddress, abi, signer)
  console.log('estoy trabajando 2')

  // Convert the value to the appropriate format for Ethereum (wei)
  const valueInWei = ethers.utils.parseEther(value.toString())

  const tx = await contract.createEscrow(arbiterAddress, {
    value: valueInWei,
  })
  console.log('estoy trabajando 3')

  await tx.wait(1)
  console.log('Created Bounty')
}
