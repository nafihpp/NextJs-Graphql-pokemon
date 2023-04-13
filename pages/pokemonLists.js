import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client/react/hooks";
import { FETCHPOKEMONS } from "../utils/service";
import Link from "next/link";

let currentItems = [];

function PokemonList({ data }) {
    const [reminingPokemons, setRemainingPokemons] = useState([]);
    const [firstData, setFirstData] = useState([]);
    const [fetchpokemons] = useLazyQuery(FETCHPOKEMONS);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        setFirstData(data?.pokemons);
    }, [data?.pokemons]);

    useEffect(() => {
        fetchpokemons({
            variables: { first: 200 },
            fetchPolicy: "network-only",
        }).then((response) => {
            setRemainingPokemons(response?.data?.pokemons?.slice(60, 200));
        });
    }, []);

    let newStaticplusRealTimeData = firstData?.concat(reminingPokemons);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    currentItems = newStaticplusRealTimeData.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    function surprise(PassedArray) {
        const shuffled = PassedArray.sort(() => Math.random() - 0.5);
        currentItems = shuffled;
    }

    function surprise(PassedArray) {
        const shuffled = PassedArray.sort(() => Math.random() - 0.5);
        currentItems = shuffled;
    }

    // Change page
    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate total pages
    const totalPages = Math.ceil(
        newStaticplusRealTimeData.length / itemsPerPage
    );

    return (
        <>
            <button
                onClick={(e) => {
                    surprise(currentItems);
                }}
            >
                surprise Me
            </button>
            <div className="pokemon-list">
                {currentItems?.map((pokemon) => (
                    <Link
                        key={pokemon.id}
                        className="pokemon-card"
                        href={{
                            pathname: `/${pokemon.name}`,
                            query: { pokemonid: pokemon.number },
                        }}
                    >
                        <div className="pokemon-image-container">
                            <img
                                src={pokemon?.image}
                                alt={pokemon?.name}
                                className="pokemon-image"
                            />
                        </div>
                        <div className="pokemon-details-container">
                            <h2 className="pokemon-number">
                                #{pokemon.number}
                            </h2>
                            <h2 className="pokemon-name">{pokemon?.name}</h2>
                            <div className="pokemon-types">
                                {pokemon?.types?.map((type, index) => (
                                    <h2
                                        key={type}
                                        className={`pokemon-type pokemon-type-${index} ${
                                            pokemon?.types?.length === 1
                                                ? "single-type"
                                                : "null"
                                        }`}
                                    >
                                        {type}
                                    </h2>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <p style={{ textAlign: "center" }}>Current Page: {currentPage}</p>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {Array.from(Array(totalPages).keys()).map((pageNumber) => (
                    <button
                        className="button-pagination"
                        key={pageNumber}
                        onClick={() => onPageChange(pageNumber + 1)}
                    >
                        {pageNumber + 1}
                    </button>
                ))}
            </div>
        </>
    );
}

export default PokemonList;
