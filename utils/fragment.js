import { gql } from "@apollo/client";

export const PokemonFragment = gql`
    fragment PokemonFragment on Pokemon {
        id
        name
        number
        image
        evolutions {
            id
            name
            number
            image
            evolutions {
                id
                name
                number
                image
            }
        }
    }
`;
