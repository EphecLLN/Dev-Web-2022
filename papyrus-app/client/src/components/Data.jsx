import React from "react";


const Data = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    return (
        <div className="Data">
            <p>{!data ? "chargement..." : data}</p>
        </div>
    );
}

export default Data;