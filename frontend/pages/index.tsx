import React from 'react'
import styles from '../styles/Home.module.css'
import { Flex, Text } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Glitch from 'react-glitch-text'
import { useGlitch } from 'react-powerglitch'

import Link from 'next/link'
import HeroComponent from '../components/navigation/hero'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react'

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const { data: session } = useSession()

  const account = useAccount()
  useEffect(() => {
    setIsConnected(account.isConnected)
    const handleDisconnect = () => {
      setIsConnected(false)
    }

    if (account.isDisconnected) {
      handleDisconnect()
    }

    return () => {
      // Cleanup function
    }
  }, [account.isDisconnected])

  //Inicializamos useNitification de la libreria web3uikit
  console.log('account.isConnected', account.isConnected)
  return <HeroComponent></HeroComponent>
}
