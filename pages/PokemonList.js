import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client/react/hooks";
import { FETCHPOKEMONS } from "../utils/service";

function PokemonList({ data }) {
    const [reminingPokemons, setRemainingPokemons] = useState([]);
    const [firstData, setFirstData] = useState([]);
    const [fetchpokemons] = useLazyQuery(FETCHPOKEMONS);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        setFirstData(data.pokemons);
    }, [data.pokemons]);

    useEffect(() => {
        fetchpokemons({
            variables: { first: 200 },
            fetchPolicy: "network-only",
        }).then((response) => {
            setRemainingPokemons(response.data.pokemons.slice(60, 200));
        });
    }, []);

    let newStaticplusRealTimeData = firstData.concat(reminingPokemons);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = newStaticplusRealTimeData.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    // Change page
    const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(
        newStaticplusRealTimeData.length / itemsPerPage
    );

    return (
        <>
            <div className="pokemon-list">
                {currentItems.map((pokemon) => (
                    <a
                        key={pokemon.id}
                        className="pokemon-card"
                        href={`/${pokemon.name}`}
                    >
                        <div className="pokemon-image-container">
                            <img
                                src={pokemon.image}
                                alt={pokemon.name}
                                className="pokemon-image"
                            />
                        </div>
                        <div className="pokemon-details-container">
                            <h2 className="pokemon-number">
                                #{pokemon.number}
                            </h2>
                            <h2 className="pokemon-name">{pokemon.name}</h2>
                            <div className="pokemon-types">
                                {pokemon.types.map((type, index) => (
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
                    </a>
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

// useEffect(() => {
//     fetchpokemons({
//         variables: { first: 120 },
//         fetchPolicy: "network-only",
//     }).then((response) => {
//         setrestPokemons(response.data.pokemons.slice(60, 120));
//     });
// }, []);
