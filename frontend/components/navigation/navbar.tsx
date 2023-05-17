import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Flex, Text, Heading } from '@chakra-ui/react'

const Navbar = () => {
  return (
    <Flex justify="space-between" align="center" bgColor="gold" py="5" px="5">
      <Heading>Notion</Heading>
      <ConnectButton></ConnectButton>
    </Flex>
  )
}

export default Navbar
