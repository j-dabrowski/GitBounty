import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import { Hero } from 'web3uikit'
import Image from 'next/image'

const Home = () => {
  return (
    <Flex height="100vh" justifyContent="center">
      <Flex flexDirection="column" flex={1} justifyContent="center" px={8}>
        <Hero
          align="center"
          backgroundColor="#663cfe"
          height="400px"
          linearGradient=""
          padding="40px"
          rounded="20px"
        >
          <Heading as="h3" color="whiteAlpha.50">
            Need Help?
          </Heading>
          <Heading as="h1" color="whiteAlpha.50">
            Looking to get started?
          </Heading>
          <Heading as="h1" color="whiteAlpha.50">
            Connect your wallet to start
          </Heading>
          <Image src="/logo-hackaton.png" width={100} height={100} alt="Picture of the author" />
        </Hero>
      </Flex>
    </Flex>
  )
}

export default Home
