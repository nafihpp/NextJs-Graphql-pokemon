import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { EVOLUTIONDETAILS, RecursivePokemonFragment } from "../utils/service";

function popup({ setPopup, popup, name }) {
    const [fetchpokemonEvolution] = useLazyQuery(EVOLUTIONDETAILS);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (name) {
            setLoading(true);
            fetchpokemonEvolution({
                variables: { name },
                fetchPolicy: "network-only",
            }).then((response) => {
                console.log(response.data.pokemon, "----");
                setData(response.data.pokemon);
                setLoading(false);
            });
        }
        console.log("fetching happend");
    }, [name]);

    return (
        <div className="popup">
            <div className="popup-content">
                <button
                    className="popup-close"
                    onClick={(e) => {
                        setPopup(!popup);
                    }}
                >
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 1024 1024"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path>
                        <path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                    </svg>
                </button>
                {!loading ? (
                    <div className="evolution-container">
                        <div className="avatarsContainer">
                            <h2>{data.id}</h2>
                            <p>{data.name}</p>
                            <p>{data.number}</p>
                            <img src={data.image} />
                        </div>
                        {data?.evolutions?.map((evol) => (
                            <div className="avatarsContainer">
                                <h2>{evol.id}</h2>
                                <p>{evol.name}</p>
                                <p>{evol.number}</p>
                                <img src={evol.image} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>loading</p>
                )}
            </div>
        </div>
    );
}

export default popup;
