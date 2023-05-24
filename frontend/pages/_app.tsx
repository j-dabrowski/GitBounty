import { useEffect } from 'react'
import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { SessionProvider } from 'next-auth/react'
import { Providers } from './providers'

import { configureChains, createClient, useAccount, WagmiConfig } from 'wagmi'
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  goerli,
  polygonMumbai,
  optimismGoerli,
  arbitrumGoerli,
  polygonZkEvm,
  polygonZkEvmTestnet,
} from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import MainLayout from '../layout/mainLayout'
import { useRouter } from 'next/router'

const { chains, provider } = configureChains(
  [
    mainnet,
    goerli,
    polygon,
    polygonMumbai,
    optimism,
    optimismGoerli,
    arbitrum,
    arbitrumGoerli,
    polygonZkEvm,
    polygonZkEvmTestnet,
  ],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'My Alchemy DApp',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export { WagmiConfig, RainbowKitProvider }

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  const router = useRouter()
  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      if (!isReconnected) router.reload()
    },
  })
  console.log('{...pageProps}', { ...pageProps })
  // useEffect(() => {
  //   if (account.isConnected) {
  //     router.push('/dev-or-bountier')
  //   } else {
  //     router.push('/')
  //   }
  // }, [account.isConnected])

  return (
    <WagmiConfig client={wagmiClient}>
      <SessionProvider session={session}>
        <RainbowKitProvider
          modalSize="compact"
          initialChain={process.env.NEXT_PUBLIC_DEFAULT_CHAIN}
          chains={chains}
        >
          <Providers>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </Providers>
        </RainbowKitProvider>
      </SessionProvider>
    </WagmiConfig>
  )
}

export default MyApp
