import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { EVOLUTIONDETAILS } from "../utils/service";

function Popup({ setPopup, popup, name }) {
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
        console.log("fetching happening while popup clicked");
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
                            <div className="avatar-image-container">
                                <img
                                    src={data.image}
                                    className="avatar-image"
                                />
                            </div>
                        </div>
                        {data?.evolutions?.length >= 1 ? (
                            <div className="evolution-arrow">
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    stroke-width="0"
                                    viewBox="0 0 256 512"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path>
                                </svg>
                            </div>
                        ) : null}
                        {data?.evolutions?.map((evol) => (
                            <div className="avatarsContainer" key={evol.id}>
                                <h2>{evol.id}</h2>
                                <p>{evol.name}</p>
                                <p>{evol.number}</p>
                                <div className="avatar-image-container">
                                    <img
                                        src={evol.image}
                                        className="avatar-image"
                                    />
                                </div>
                                {evol.number == "002" ? (
                                    <div className="evolution-arrow">
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            viewBox="0 0 256 512"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path>
                                        </svg>
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={{ color: "#fff", fontSize: "20px" }}>loading</p>
                )}
            </div>
        </div>
    );
}

export default Popup;
