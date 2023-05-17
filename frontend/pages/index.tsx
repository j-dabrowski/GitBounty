import React from 'react'
import Link from 'next/link'
import { Text, Heading, Input } from '@chakra-ui/react'
import InstructionsComponent from '../components/InstructionsComponent'

const Home = () => {
  return (
    <React.Fragment>
      <Heading mb={6}>Log in</Heading>
      <Text color="blue.900" fontWeight="black">
        Connect wallet to start
      </Text>
      {/* <Link href="./owner">LINK</Link>
      <Input placeholder="hola" variant="filled" mb={3} /> */}
    </React.Fragment>
  )
}

export default Home
