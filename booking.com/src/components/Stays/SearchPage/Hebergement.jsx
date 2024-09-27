import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import { Box, Container } from "@mui/material";
import FirstSection from "../PageSections/FirstSection";
import { SearchDeals } from "../SearchDeals/SearchDeals";
import Maps from "../HotelDetails/TopSection/maps";
import styles from "./SearchBox.module.css";
import './Hebergements.css';
import Cardss from "./cardss";

export const Hebergement = () => {
    const [type, setType] = useState('');
    const storedType = localStorage.getItem('type');
    const hotelData = useSelector(state => state.hotelsData.hotels);
    const [showData, setShowData] = useState(hotelData);
    const [price, setPrice] = useState(false);
    const prefilledData = useLocation().state;
    const [properties, setProperties] = useState([]);
    const [propertiesByDest, setPropertiesByDest] = useState([]);
    const [propertiesCount, setPropertiesCount] = useState(0);

    useEffect(() => {
        const storedType = localStorage.getItem('type');
        if (storedType && storedType.endsWith('s')) {
            setType(storedType.slice(0, -1));
        } else {
            setType(storedType || '');
        }
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/properties/api')
            .then(response => {
                setProperties(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the properties!', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:3000/properties/api/getByType/${type}`)
            .then(response => {
                setPropertiesByDest(response.data);
                setPropertiesCount(response.data.length);
            })
            .catch(error => {
                console.error('There was an error fetching the properties!', error);
            });
    }, [type]);

    return (
        <div>
            <h1 style={{ padding: '20px 160px' }}>Trouvez l'{type} idéal sur Resa</h1>
            <br />
            <SearchDeals suggestions={[]} />
            <Container>
                <nav className="breadcrumb">
                    <a href="/">Home</a> &gt;
                    <a href={`/search/`}>{storedType}</a> &gt;
                    <a href={`/search/`}>Tous les {storedType} </a>
                </nav>
            </Container>
            <div className={styles.searchPageContainers}>
                <div style={{ padding: '40px' }}>
                    <h5 style={{ paddingLeft: '40px' }}>Des {storedType} à proximité pour une réservation de dernière minute</h5>
                    <br />
                    <div className="hotelListContainers">
                    {propertiesByDest.length > 0 ? (
                    propertiesByDest.map((property, index) => {
                        const roomSize = property.apartment_spaces && property.apartment_spaces.length > 0 ? property.apartment_spaces[0].area : 'N/A';
                        const photoUrl = property.apartment_spaces && property.apartment_spaces.length > 0 && property.apartment_spaces[0].photos && property.apartment_spaces[0].photos.length > 1
                            ? property.apartment_spaces[0].photos[1]
                            : '';
                            return (
                      <div className="hotelCard" key={index}>
                                <Cardss property={property} photoUrl={photoUrl}/>
                            </div>
                              );
                        })
                    ) : (
                        <p>No properties available</p>
                    )}

                    </div>
                </div>
            </div>
        </div>
    );
};
