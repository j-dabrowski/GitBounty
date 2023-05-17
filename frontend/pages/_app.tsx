import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { Providers } from './providers'

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
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
import { useEffect } from 'react'

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
  appName: 'Notional',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export { WagmiConfig, RainbowKitProvider }

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()
  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      if (!isReconnected) router.reload()
    },
  })

  useEffect(() => {
    if (account.isConnected) {
      router.push('/owner')
    }

    router.push('/')
  }, [account.isConnected])

  console.log('account', account)

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        coolMode
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
    </WagmiConfig>
  )
}

export default MyApp
