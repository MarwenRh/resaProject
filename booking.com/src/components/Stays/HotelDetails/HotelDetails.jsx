import styled from 'styled-components';
import SmokeFreeIcon from '@material-ui/icons/SmokeFree';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import StarIcon from '@mui/icons-material/Star';
import FirstSection from '../PageSections/FirstSection';
import { getSuggestions } from '../../../actions/suggestionAction';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {  Grid, Card, CardMedia, Box, Button, Typography, Modal, Divider, Paper, } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import des styles CSS de la carousel
import { Carousel } from 'react-responsive-carousel';
import Maps from './TopSection/maps'
import WifiIcon from '@material-ui/icons/Wifi';
import KitchenIcon from '@material-ui/icons/Kitchen';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import TvIcon from '@material-ui/icons/Tv';
import LockIcon from '@material-ui/icons/Lock';
import SecurityIcon from '@material-ui/icons/Security';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import BathtubIcon from '@material-ui/icons/Bathtub';
import './TopSection/header.css';
import React from 'react';
import { Commentaire } from './commentaire';
import { Rules } from './rules';
import { Reviews } from './reviews';
import { Disponibilite } from './disponiblite';
import { Amenities } from './amenties';

const Container = styled.div`width: 100%;`

const hotelDetails = {
  location: 'Exceptional location - Inside city center',
  walking: 'Exceptional for walking',
  landmarks: [
    { name: 'Royal Pump Room Museum', distance: '0.1 km' },
    { name: 'Harrogate Turkish Baths', distance: '0.1 km' },
  ],
};

export const HotelDetails = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const openFullscreen = () => {
    setIsFullscreen(true);
  };
  
  const closeFullscreen = () => {
    setIsFullscreen(false);
  };
  
  const { id } = useParams(); // Get id from URL params
  const hotelData = useSelector(state => state.hotelsData.hotels);
  const [homeData, setHomeData] = useState(null);
  const dispatch = useDispatch();
  const suggestions = useSelector(state => state.suggestionsData.suggestions);
  
  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/properties/getImages/${id}`);
        setImages(res.data);
        console.log(res.data);
        console.log(id);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [id]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/properties");
        const data = response.data;
        setHomeData(data); 
      } catch (error) {
      }
    };
    fetchData();
  }, []);

  // Fetch hotel details based on id
  const filteredData = homeData ? homeData.find(item => item._id === id) : null;

  useEffect(() => {
    if (suggestions.length === 0) {
      dispatch(getSuggestions());
    }
  }, [suggestions]);

  if (!hotelData) {
    return <div>Loading...</div>; 
  }
  return (
    
    <>
     {filteredData ? (
            <>
      <FirstSection suggestions={suggestions}/>
      <Container maxWidth="lg" style={{ marginTop: '2rem', padding: '0 40px' }}>
    <div className="App">
      <nav className="breadcrumb">
        <a href="/">Home</a> &gt;
        <a href="/search">Hôtels</a> &gt;
        <a href={`/search/${id}`}>{filteredData.name}</a> 

       </nav>
      
      <div className="property-details">
        <div className="property-header">
          <h1>{filteredData.name}</h1>
          <p className="address">
            <span role="img" aria-label="location">📍</span> – <a href="#">Excellent emplacement -  {filteredData.location.city}, {filteredData.location.state}, {filteredData.location.country},{filteredData.location.address} voir la carte</a> – 
          </p>
        </div>

        <div className="property-nav">
          <a href="#Home" className="active">Vue d'ensemble</a>
          <a href="#">Infos sur les appartements et tarifs</a>
          <a href="#Amenties">Équipements</a>
          <a href="#Rules">Règles de la maison</a>
          <a href="#">À savoir</a>
          <a href="#Reviews">Commentaires clients (5)</a>
        </div>

        <div className="property-actions">
          <button className="reserve-btn">Réservez votre séjour en appartement</button>
          <button className="price-adjust-btn">Nous ajustons nos tarifs</button>
        </div>
      </div>
    </div>
    </Container>
        </>
          ) : (
            <span>Data unavailable</span>
          )}
      <Container maxWidth="lg" style={{ marginTop: '2rem', padding: '0 35px' ,marginBottom:'2rem'}}>
      {filteredData && (
        <>
          {/* Hotel Images */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardMedia
                      component="img"
                      width="500"
                      height="500"
                      image={images[0]} // Main hotel image
                      alt="Hotel main view"
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    {images.slice(1, 3).map((photo, index) => (
                      <Grid item xs={6} key={index}>
                        <Card>
                          <CardMedia
                            component="img"
                            width="250"
                            height="150"
                            image={photo}
                            alt={`Hotel view ${index + 1}`}
                          />
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: '16px' }}>
                    <Card>
                      <CardMedia
                        component="img"
                        width="500"
                        height="350"
                        image={images[4]}
                        alt="Hotel view 3"
                      />
                    </Card>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Button variant="contained" fullWidth onClick={openFullscreen} style=    {{ padding: '10px 0', backgroundColor: 'transparent', color: '#0073e6',border:"1px solid #0073e6",borderRadius:"5px" }} >
                    See All 90 Photos
                  </Button>
                </Grid>
                     {/* Hotel Details */}
                     <Grid item xs={12}>
             <Box>
              <Typography variant="h4" component="h2" gutterBottom>
                {filteredData.name}
                <Box display="inline" ml={2}>
                  {[...Array(filteredData.overall_rating)].map((_, i) => (
                    <StarIcon key={i} style={{ color: '#FFD700' }} />
                  ))}
                </Box>
              </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box> </Box>
                  <Box> 
              
                  <button className="reserve-btn" color="primary">
                    Select Room
                  </button>
                </Box>
                </Box>
                <Typography variant="subtitle1" gutterBottom>
                  {filteredData.description}
                </Typography>
                <Divider style={{ margin: '1rem 0' }} />
              </Box>
            </Grid>
            <Grid item xs={12}>
         <Typography variant="h5" component="h3" >
            Overview
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '2rem' }}>
            {filteredData.description}
            helooo 
          </Typography>
          <Divider style={{ margin: '1rem 0' }} />

          {/* Most Popular Facilities */}
          <div id="Amenties"> <Amenities /></div>
            </Grid>
            </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: '1rem' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <LocationOnIcon color="primary" />
                  <Typography variant="body1" style={{ marginLeft: '0.5rem' }}>
                    {filteredData.location.city}, {filteredData.location.state}, {filteredData.location.country}
                  </Typography>
                </Box>
                <Divider />
                <Box display="flex" flexDirection="column" my={2}>
                  <Typography variant="body1">
                    Address: {filteredData.location.address}
                  </Typography>
                  <Typography variant="body1">
                    City: {filteredData.location.city}
                  </Typography>
                  <Typography variant="body1">
                    State: {filteredData.location.state}
                  </Typography>
                  <Typography variant="body1">
                    Country: {filteredData.location.country}
                  </Typography>
                </Box>
                <Divider />

                <Box my={2} style={{ height: '200px' }}>
                  <Maps pointx={filteredData.location.coordinates.latitude} pointy={filteredData.location.coordinates.longitude} />
                </Box>
              </Paper>
              <Paper elevation={3} style={{ padding: '1rem', marginTop: '1rem' }}>
                <Typography variant="h6" gutterBottom>
                 Exceptionnel
                </Typography>
                {hotelDetails.landmarks.map((landmark, index) => (
                  <Box key={index} display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">{landmark.name}</Typography>
                    <Typography variant="body2">{landmark.distance}</Typography>
                  </Box>
                ))}
                <Divider style={{ margin: '1rem 0' }} />
                <Typography variant="h6" gutterBottom>
                  Property highlights
                </Typography>
                <Box display="flex" flexDirection="column">
                  <Typography variant="body2">In London City Centre</Typography>
                  <Typography variant="body2">Airport transfer</Typography>
                  <Typography variant="body2">Front desk [24-hour]</Typography>
                  <Typography variant="body2">Premium TV channels</Typography>
                </Box>
              </Paper>
              <Paper elevation={3} style={{ padding: '1rem', marginTop: '1rem' }}>
               
                <Typography variant="h6" gutterBottom>
                  Property highlights
                </Typography>
                <Box display="flex" flexDirection="column">
                  <Typography variant="body2">In London City Centre</Typography>
                  <Typography variant="body2">Airport transfer</Typography>
                  <Typography variant="body2">Front desk [24-hour]</Typography>
                  <Typography variant="body2">Premium TV channels</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Modal
            open={isFullscreen}
            onClose={closeFullscreen}
            aria-labelledby="fullscreen-modal-title"
            aria-describedby="fullscreen-modal-description"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ backgroundColor: 'white', padding: '2rem', maxWidth: '90%', maxHeight: '90%', overflow: 'auto' }}>
              <Carousel showArrows={true} infiniteLoop={true}>
                {images.map((imageUrl, index) => (
                  <div key={index}>
                    <img src={imageUrl} alt={`Hotel view ${index + 1}`} />
                  </div>
                ))}
              </Carousel>
            </div>
          </Modal>

        </>
      )}
    </Container>
   
    <Disponibilite/>
    <div id="Reviews"> <Reviews /></div>
    <div id="Rules"> <Rules/></div>
    <Commentaire/>
    
    </>
  );
};
