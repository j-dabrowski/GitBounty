import React from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Text, Heading, Input } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import InstructionsComponent from '../components/InstructionsComponent'

const Home = () => {
  const { data: session } = useSession()
  const { isConnected } = useAccount()
  console.log('session', session)
  return (
    <React.Fragment>
      <Heading mb={6}>Log in</Heading>
      {isConnected && session ? (
        <Heading color="green.900" fontWeight="black">
          You are connected
        </Heading>
      ) : (
        <Heading color="blue.900" fontWeight="black">
          Connect your wallet to start
        </Heading>
      )}
      {/* <Link href="./owner">LINK</Link>
      <Input placeholder="hola" variant="filled" mb={3} /> */}
    </React.Fragment>
  )
}

export default Home
