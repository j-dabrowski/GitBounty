import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Flex, Heading } from '@chakra-ui/react'

const Navbar = () => {
  return (
    <Flex justifyContent="space-between" align="center" bgColor="yellow" px={5} minHeight="100px">
      <Heading as="h3">NOTIONAL</Heading>
      <ConnectButton></ConnectButton>
    </Flex>
  )
}

export default Navbar
