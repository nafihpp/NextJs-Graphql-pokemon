import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client/react/hooks";
import { FETCHPOKEMONS } from "./service";

function PokemonList({ data }) {
    const [restPokemons, setrestPokemons] = useState([]);
    const [firstData, setFirstDta] = useState([]);
    const [fetchpokemons] = useLazyQuery(FETCHPOKEMONS);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);

    useEffect(() => {
        setFirstDta(data.pokemons);
    }, []);

    useEffect(() => {
        fetchpokemons({
            variables: { first: 200 },
            fetchPolicy: "network-only",
        }).then((response) => {
            setrestPokemons(response.data.pokemons.slice(60, 200));
        });
    }, [currentPage > 3]);

    let newArray = firstData.concat(restPokemons);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = newArray.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(newArray.length / itemsPerPage);

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
                            <h2 className="pokemon-number">{pokemon.number}</h2>
                            <h2 className="pokemon-name">{pokemon.name}</h2>
                            <div className="pokemon-types">
                                {pokemon.types.map((type) => (
                                    <h2 key={type} className="pokemon-type">
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
