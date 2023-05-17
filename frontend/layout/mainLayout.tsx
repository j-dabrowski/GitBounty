import { Flex } from '@chakra-ui/react'
import Navbar from '../components/navigation/navbar'

const MainLayout = ({ children }) => {
  return (
    <Flex>
      <Flex direction="column" width="100vw">
        <Navbar />
        <Flex height="100vh" direction="column" alignItems="center" justifyContent="center">
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default MainLayout
