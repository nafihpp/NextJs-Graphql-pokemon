import { ApolloProvider, useApolloClient } from "@apollo/client";
import "../styles/globals.css";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Router } from "next/router";

const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app/",
    cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());

    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}

export default MyApp;
