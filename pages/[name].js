import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FETCHSINGLE } from "./service";
import Popup from "./popup";

export default function PokemonDetail() {
    const [singleData, setSingleData] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [fetchSinglePokemon] = useLazyQuery(FETCHSINGLE);
    const { name } = router.query;
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        if (name) {
            setLoading(true);
            fetchSinglePokemon({
                variables: { name },
                fetchPolicy: "network-only",
            }).then((response) => {
                setSingleData(response.data.pokemon);
                setLoading(false);
            });
        }
    }, [name]);

    if (loading) {
        return <h1 className="loading">loading</h1>;
    }

    const handleEvolutionClick = () => {
        setPopup(!popup);
    };

    return (
        <>
            <div className="pokemonContainer" key={singleData?.id}>
                <div className="pokemon-cardBig">
                    <div className="pokemon-image-container">
                        <img
                            src={singleData?.image}
                            alt={singleData?.name}
                            className="pokemon-image"
                        />
                    </div>
                    <div className="pokemonDetailsContainer">
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
                        <div className="pokemon-info">
                            <p className="pokemon-info-item">
                                <span>Height:</span>{" "}
                                {singleData?.height?.maximum}
                            </p>
                            <p className="pokemon-info-item">
                                <span>Weight:</span>{" "}
                                {singleData?.weight?.maximum}
                            </p>
                            <p className="pokemon-info-item">
                                <span>Classification:</span>{" "}
                                {singleData?.classification}
                            </p>
                            <p className="pokemon-info-item">
                                <span>Type:</span>{" "}
                                {singleData?.types?.join(", ")}
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
                        <button
                            className="evolution-button"
                            onClick={handleEvolutionClick}
                        >
                            Show Evolutions
                        </button>
                        {popup ? (
                            <Popup
                                setPopup={setPopup}
                                popup={popup}
                                name={singleData.name}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
}

// export async function getStaticPaths() {
//     const { data } = await useQuery(gql`
//         query FetchPokemons {
//             pokemons(first: 20) {
//                 id
//             }
//         }
//     `);

//     const paths = data.pokemons.map((pokemon) => ({
//         params: { id: pokemon.id },
//     }));

//     return { paths, fallback: true };
// }

// export async function getStaticProps({ params }) {
//     const { id } = params;

//     const { data } = await useQuery(POKEMON_QUERY, {
//         variables: { id },
//     });

//     const pokemon = data.pokemon;

//     return { props: { pokemon } };
// }
