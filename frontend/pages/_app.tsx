import { NotificationProvider } from "web3uikit";
import { MoralisProvider } from "react-moralis";

import { useRouter } from 'next/router'


//Initializar Apollo
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import "../styles/globals.css";
import MainLayout from "../layout/mainLayout";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.studio.thegraph.com/query/45112/chainlink-hackathon-notional/version/latest",
});

const MyApp = ({ Component, pageProps, session }) => {
  const router = useRouter();

  return (
    
  <MoralisProvider initializeOnMount={false}>
    <ApolloProvider client={client}>
        <MainLayout>
        <NotificationProvider>
          <Component {...pageProps} />
          </NotificationProvider>
        </MainLayout>
        </ApolloProvider>
    </MoralisProvider>
    
  )
}


export default MyApp;
