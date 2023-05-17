import React from 'react'
import { useAccount } from 'wagmi'
import { Flex, Center, Text, Link } from '@chakra-ui/react'

const Owner = () => {
  return (
    <React.Fragment>
      <Flex direction="column" align="center">
        <Text>Choose how you want to proceed</Text>
        <Flex mt="5">
          <Center>
            <Link bgColor="orange" borderRadius="10" p="3" _hover={{ textDecoration: 'none' }}>
              As a Dev
            </Link>
          </Center>
          <Center ml="5">
            <Link bgColor="lightgreen" p="3" borderRadius="10" _hover={{ textDecoration: 'none' }}>
              As a Bounty giver
            </Link>
          </Center>
        </Flex>
      </Flex>
    </React.Fragment>
  )
}

export default Owner
