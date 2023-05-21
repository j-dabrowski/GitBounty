import { Share_Tech_Mono } from '@next/font/google'
import { Flex } from '@chakra-ui/react'
import Navbar from '../components/navigation/navbar'

const shareTechMono = Share_Tech_Mono({ subsets: ['latin'], weight: ['400'] })

const MainLayout = ({ children }) => {
  return (
    <Flex height="100vh" flexDirection="column" className={shareTechMono.className}>
      <Navbar />
      {children}
    </Flex>
  )
}

export default MainLayout
