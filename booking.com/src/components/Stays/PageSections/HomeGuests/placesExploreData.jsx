import axios from 'axios';
import React from 'react';
import {useEffect, useState} from "react";

const PlacesExploreData = ({ v }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/explorePlaces");
                setData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        getData();
    }, [v]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {data && (
                <div style={{ marginTop: "-10px", display: "grid", gridGap: "20px", gridTemplateColumns: "auto auto auto auto" }}>
                    {data.map((el) => (
                        <div key={el.name} style={{ marginBottom: "-33px", padding: "0" }}>
                            <p style={{ color: "#4A9AD4", marginBottom: "-12px", fontSize: "15px" }}>{el.name}</p>
                            <p style={{ color: "#A5A5A5", marginTop: 10, fontSize: "14px" }}>{el.properties.join(', ')}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PlacesExploreData;
