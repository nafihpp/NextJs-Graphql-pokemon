import { useRouter } from "next/router";
import { ApolloClient, InMemoryCache, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FETCHPOKEMONS, FETCHSINGLE } from "../utils/service";
import Popup from "./popup";

const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app/",
    cache: new InMemoryCache(),
});

export default function PokemonDetail({ singleData }) {
    const router = useRouter();
    const { name } = router.query;
    const [fetchSinglePokemon] = useLazyQuery(FETCHSINGLE);
    //const [singleData, setSingleData] = useState(null);
    const [popup, setPopup] = useState(false);
    const [version, setVersion] = useState(0);

    // useEffect(() => {
    //     if (name) {
    //         fetchSinglePokemon({
    //             variables: { name },
    //             fetchPolicy: "network-only",
    //         }).then((response) => {
    //             setSingleData(response.data.pokemon);
    //         });
    //     }
    // }, [name]);

    const handleEvolutionClick = () => {
        setPopup(!popup);
    };

    return (
        <>
            <div className="pokemonContainer" key={singleData?.id}>
                <div className="topContianer">
                    <h2 className="pokemon-number">{singleData?.number}</h2>
                    <h1 className="pokemon-name">{singleData?.name}</h1>
                    <div className="pokemon-types">
                        {singleData?.types?.map((type) => (
                            <h2
                                key={type}
                                className={`pokemon-type pokemon-type-${type}`}
                            >
                                {type}
                            </h2>
                        ))}
                    </div>
                </div>
                <div className="pokemon-cardBig">
                    <div className="pokemon-image-container-big">
                        <img
                            src={singleData?.image}
                            alt={singleData?.name}
                            className="pokemon-image"
                        />
                    </div>
                    <div className="detailsContainer">
                        <div className="pokemonDetailsContainer">
                            <div className="pokemon-info">
                                <div className="pokemon-versions">
                                    {" "}
                                    <div
                                        className={`version-first-container ${
                                            version === 0 && "bordered-1"
                                        }`}
                                        onClick={(e) => setVersion(0)}
                                    >
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            stroke-width="0"
                                            viewBox="0 0 24 24"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill="none"
                                                d="M0 0h24v24H0z"
                                            ></path>
                                            <path d="M14.5 12a2.5 2.5 0 01-5 0 2.5 2.5 0 015 0zm7.5 0c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zm-2 0h-4c0-2.21-1.79-4-4-4s-4 1.79-4 4H4c0 4.41 3.59 8 8 8s8-3.59 8-8z"></path>
                                        </svg>
                                    </div>
                                    <div
                                        className={`version-second-container ${
                                            version === 1 && "bordered-2"
                                        }`}
                                        onClick={(e) => setVersion(1)}
                                    >
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            stroke-width="0"
                                            viewBox="0 0 24 24"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill="none"
                                                d="M0 0h24v24H0z"
                                            ></path>
                                            <path d="M14.5 12a2.5 2.5 0 01-5 0 2.5 2.5 0 015 0zm7.5 0c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zm-2 0h-4c0-2.21-1.79-4-4-4s-4 1.79-4 4H4c0 4.41 3.59 8 8 8s8-3.59 8-8z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    {version == 0 ? (
                                        <span>
                                            When the bulb on its back grows
                                            large, it appears to lose the
                                            ability to stand on its hind legs.
                                        </span>
                                    ) : (
                                        <span>
                                            Exposure to sunlight adds to its
                                            strength. Sunlight also makes the
                                            bud on its back grow larger.
                                        </span>
                                    )}
                                </div>
                                <div className="pokemon-types">
                                    {singleData?.types.map((type, index) => (
                                        <h2
                                            key={type}
                                            className={`pokemon-type ${
                                                singleData?.types.length === 1
                                                    ? " single-type"
                                                    : ""
                                            } pokemon-type-${index}`}
                                        >
                                            {type}
                                        </h2>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="special-container">
                            <p className="pokemon-info-item">
                                <span className="headline-info">Height:</span>{" "}
                                {singleData?.height?.maximum}
                            </p>
                            <p className="pokemon-info-item">
                                <span className="headline-info">Weight:</span>{" "}
                                {singleData?.weight?.maximum}
                            </p>
                            <p className="pokemon-info-item">
                                <span className="headline-info">
                                    Classification:
                                </span>{" "}
                                {singleData?.classification}
                            </p>
                            <p className="pokemon-info-item">
                                <span>Weaknesses:</span>{" "}
                                {singleData?.weaknesses?.join(", ")}
                            </p>
                            <p className="pokemon-info-item">
                                <span>Resistances:</span>{" "}
                                {singleData?.resistant?.join(", ")}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="evolution-container">
                    <button
                        className="evolution-button"
                        onClick={handleEvolutionClick}
                    >
                        Show Evolutions
                    </button>
                </div>
                {popup ? (
                    <Popup
                        setPopup={setPopup}
                        popup={popup}
                        name={singleData.name}
                    />
                ) : null}
            </div>
        </>
    );
}

export async function getStaticPaths() {
    const { data } = await client.query({
        query: FETCHPOKEMONS,
        variables: { first: 20 },
    });

    const paths = data.pokemons.slice(0, 20).map((pokemon) => ({
        params: { name: pokemon.name },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const { data } = await client.query({
        query: FETCHSINGLE,
        variables: { name: params.name },
    });

    return {
        props: {
            singleData: data.pokemon,
        },
    };
}
