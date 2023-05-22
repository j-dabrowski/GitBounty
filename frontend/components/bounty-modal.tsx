//Importamos Modal que es un popUp ya formateado de web3uikit
import { useState } from 'react'
import { Modal, Input, useNotification } from 'web3uikit'
import createBounty from '../scripts/create-bounty'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'

export default function BountyModal({ esVisible, onClose, issueId, issueName }) {
  //Creamos un useState para linkear lo que escribamos en modal aqui
  const [priceToCreateBounty, setPriceToCreateBounty] = useState('')
  const { push } = useRouter()

  //Inicializamos useNitification de la libreria web3uikit

  //The signer will be the owner of the Repo and the Arbiter for the completation of the Bounty
  //With this code we get the sender/signer of the Tx
  const getAccountAddress = async () => {
    if (window.ethereum) {
      await window.ethereum.enable()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      console.log(`The address which will be the arbiter and sender is ${signer.getAddress()}`)
      return await signer.getAddress()
    }
    return null
  }

  const handleOk = async () => {
    const arbiterAddress = await getAccountAddress()
    const value = priceToCreateBounty
    await createBounty(arbiterAddress, value)

    setPriceToCreateBounty('0')
    push('/repo-owner')
  }

  return (
    //Key for Modal es definir su propiedad isVisible, para que sepa si es visible o hide
    //esVisible lo vamos a pasar a este componente en el PROPS y lo tenemos que crear en NFTBOX component
    //Tenemos que importar INPUT de Web3uikit, nos facilita introducir los parametros a cambiar

    <Modal
      isVisible={esVisible}
      //con onOk acontinuacion creamos la function para realizar la llamada al BC
      onOk={handleOk}
      onCancel={onClose}
      onCloseButtonPressed={onClose}
    >
      <Input
        label="Write the Bounty reward"
        name="Bounty Price"
        type="number"
        //Con la propiedad onChange impiclita en esta libreria, vamos a linkear el dato
        //que escribirimos para update el NFt

        onChange={(event) => {
          setPriceToCreateBounty(event.target.value)
        }}
      />
    </Modal>
  )
}
