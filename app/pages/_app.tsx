import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { ApolloProvider } from "@apollo/client";
import client from "../utils/apollo-client";
import { AuthContextProvider } from "../context/authContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SnackbarProvider maxSnack={3}>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </SnackbarProvider>
    </ApolloProvider>
  );
}
export default MyApp;
