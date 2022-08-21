
import {AppProps} from "next/app";
import '../styles/globals.css'
import { Provider } from 'react-redux'

import store from '../store'
import apolloClient from "../utils/apolloClient";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps} : AppProps) {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp
