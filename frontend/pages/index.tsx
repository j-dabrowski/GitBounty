import styles from '../styles/Home.module.css'

import Link from 'next/link'
import HeroComponent from '../components/navigation/hero'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react'

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
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

  return (
    <div>
      <main className={styles.main}>
        <div className="flex justify-center">
          {isConnected ? (
            <div>
              <div className={styles.wrapper}>
                <h1 className={styles.typewriter}> You need to choose</h1>
              </div>
              <div className={styles.wrapper}>
                <Image src="/pngegg (3).png" alt="" width={350} height={350} />
              </div>
              <div className={styles.divLinks}>
                <div className={styles.wrapper}>
                  <Link className={styles.box} href="/repo-owner"></Link>
                </div>
                <div className={styles.wrapper}>
                  <Link className={styles.box2} href="/developer"></Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <HeroComponent></HeroComponent>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
