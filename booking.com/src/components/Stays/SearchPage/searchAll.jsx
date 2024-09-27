import {useEffect, useState} from "react";
import {HotelDataComponent} from "./HotelDataComponent";
import {FilteringBox} from "./FilteringBox";
import {SearchBox} from "./SearchBox";
import styles from "./SearchBox.module.css";
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import FirstSection from "../PageSections/FirstSection";
import { SearchDeals } from "../SearchDeals/SearchDeals";
import { Box, Container } from "@mui/material";
import Maps from "../HotelDetails/TopSection/maps";

import { useLocation,useParams } from 'react-router-dom';
import { borderRadius } from "@mui/system";


export const SearchAll = () => {
    
    
    const hotelData = useSelector((state) => state.hotelsData.hotels);
    const [showData, setShowData] = useState(hotelData);
    const [price, setPrice] = useState(false);
    const [propertiesByDest, setPropertiesByDest] = useState([]);
    const [propertiesCount, setPropertiesCount] = useState(0);
  
   
  
    useEffect(() => {
          
            axios.get('http://localhost:3000/properties/api')
                .then(response => {
                    setPropertiesByDest(response.data);
                    setPropertiesCount(response.data.length);
                })
                .catch(error => {
                    console.error('There was an error fetching the properties!', error);
                });
        }
    );
    
  
  
    const filterPrice = (e) => {
        if (e.target.name === "price" && e.target.checked) {
            let filteredData = [];
            if (Number(e.target.value) === 1500) {
                filteredData = hotelData.filter((el) => Number(el.discountedPrice) > 1500);
            } else if (Number(e.target.value) === 1000) {
                filteredData = hotelData.filter((el) => Number(el.discountedPrice) >= 1000 && Number(el.discountedPrice) < 1500);
            } else if (Number(e.target.value) === 0) {
                filteredData = hotelData.filter((el) => Number(el.discountedPrice) <= 1000);
            }
            setShowData(filteredData);
            setPrice(!price);
        } else {
            setShowData(hotelData);
        }
    };

    const filterStar = (e) => {
        if (e.target.checked) {
            const filteredData = propertiesByDest.filter((el) => 
                Number(el.overall_rating) === Number(e.target.value)
            );
            setShowData(filteredData);
        } else {
            setShowData(propertiesByDest);
        }
    };

    const filterPolicy = (e) => {
        if (e.target.checked) {
            let filteredData = [];
            if (e.target.value === "cancellation") {
                filteredData = hotelData.filter((el) => el.cancellation === "Free");
            } else if (e.target.value === "breakFast") {
                filteredData = hotelData.filter((el) => el.breakFast === "Included");
            }
            setShowData(filteredData);
        } else {
            setShowData(hotelData);
        }
    };
 
    return (
        <div>
            <br></br>
            <SearchDeals />
            <Container>
                <nav className="breadcrumb">
                    <a href="/">Home</a> &gt;
                    <a href="/search">Hôtels</a> &gt;
                    <a href={`/search/`}>Recherche</a> &gt;
                  
                    <a href={`/search/`}>Résultats de votre recherche</a>
                </nav>
            </Container>
            <div className={styles.searchPageContainer}>
                <div className={styles.left}>
                    <Box my={2} style={{ height: '200px', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
                        <Maps pointx={15} pointy={50} />
                        <div style={{ position: 'absolute', top: '135px', left: '130px', zIndex: 1 }}>
                            <button className={styles.voirCarte}>
                                Voir sur la carte
                            </button>
                        </div>
                    </Box>
                    <FilteringBox filterPrice={filterPrice} filterStar={filterStar} filterPolicy={filterPolicy} />
                </div>
                <div style={{ padding: '20px' }}>
                    <h5> {propertiesCount} établissements trouvés </h5>
                    <br></br>
                    <div className={styles.hotelListContainer}>
                        {propertiesByDest.length > 0 ? (
                            propertiesByDest.map((e, i) => {
                                const roomSize = e.apartment_spaces && e.apartment_spaces.length > 0 ? e.apartment_spaces[0].area : 'N/A';
                                const photoUrl = e.apartment_spaces && e.apartment_spaces.length > 0 && e.apartment_spaces[0].photos && e.apartment_spaces[0].photos.length > 1
                                    ? e.apartment_spaces[0].photos[1]
                                    : '';

                                return (
                                    <HotelDataComponent
                                        key={e._id}
                                        type={e.type}
                                        id={e._id}
                                        name={e.name}
                                        Breakfast={e.amenities.Breakfast}
                                        city={e.location.city}
                                        roomSize={roomSize}
                                        url={photoUrl}
                                        cancelationPolicy={e.policies.Cancellation_policy}

                                        bedSize={e.beds_number}
                                        rating={e.overall_rating}
                                        place={e.place}
                                    />
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

