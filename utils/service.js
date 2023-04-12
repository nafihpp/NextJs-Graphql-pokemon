import { gql } from "@apollo/client";
import { PokemonFragment, RecursivePokemonFragment } from "./fragment";

export const FETCHPOKEMONS = gql`
    query Pokemons($first: Int!) {
        pokemons(first: $first) {
            id
            number
            name
            image
            types
        }
    }
`;

export const FETCHSINGLE = gql`
    query pokemon($name: String!) {
        pokemon(name: $name) {
            id
            number
            name
            weight {
                minimum
                maximum
            }
            height {
                minimum
                maximum
            }
            classification
            types
            resistant
            weaknesses
            fleeRate
            maxCP
            maxHP
            image
        }
    }
`;

export const EVOLUTIONDETAILS = gql`
    query pokemon($id: String, $name: String) {
        pokemon(id: $id, name: $name) {
            ...PokemonFragment
        }
    }
    ${PokemonFragment}
`;
