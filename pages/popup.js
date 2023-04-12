import React from "react";

function popup({ setPopup, popup, name }) {
    // const [fetchpokemonEvolution] = useLazyQuery(EVOLUTIONDETAILS);
    // useEffect(() => {
    //     if (name) {
    //         fetchpokemonEvolution({
    //             variables: { name },
    //             fetchPolicy: "network-only",
    //         }).then((response) => {
    //             console.log(response);
    //         });
    //     }
    // }, [name]);

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>{name}</h2>
                <p>Popup content goes here</p>
                <button
                    className="popup-close"
                    onClick={(e) => {
                        setPopup(!popup);
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default popup;
