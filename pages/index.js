import { ApolloClient, InMemoryCache } from "@apollo/client";
import { FETCHPOKEMONS } from "../utils/service";
import PokemonList from "./pokemonLists";

const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app/",
    cache: new InMemoryCache(),
});

function Home({ data }) {
    return <PokemonList data={data} />;
}

export async function getStaticProps() {
    const { data } = await client.query({
        query: FETCHPOKEMONS,
        variables: { first: 60 },
    });
    return {
        props: {
            data,
        },
    };
}

export default Home;
