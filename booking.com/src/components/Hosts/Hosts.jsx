import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {  Grid, Card, CardMedia, Box, Button, Typography, Modal, Divider, Paper, } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import des styles CSS de la carousel
import { Carousel } from 'react-responsive-carousel';
import Maps from '../Stays/HotelDetails/TopSection/maps'
import '../Stays/HotelDetails/TopSection/header.css';
import React from 'react';
import { Commentaire } from '../Stays/HotelDetails/commentaire';
import { Rules } from '../Stays/HotelDetails/rules';
import { Reviews } from '../Stays/HotelDetails/reviews';
import { Disponibilite } from '../Stays/HotelDetails/disponiblite';
import { Amenities } from '../Stays/HotelDetails/amenties';
import { IoHeartOutline } from "react-icons/io5";
import { IoPricetagOutline } from "react-icons/io5";
import { IoShareSocialSharp } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import FirstSection from '../Stays/PageSections/FirstSection';

const Container = styled.div`width: 100%;`
const hotelDetails = {
    location: 'Exceptional location - Inside city center',
    walking: 'Exceptional for walking',
    landmarks: [
      { name: 'Royal Pump Room Museum', distance: '0.1 km' },
      { name: 'Harrogate Turkish Baths', distance: '0.1 km' },
    ],
  };
export const Hosts = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const openFullscreen = () => {
      setIsFullscreen(true);
    };
    
    const closeFullscreen = () => {
      setIsFullscreen(false);
    };
  const location = useLocation();
  const id = location.pathname.split('/')[3];
  const [hotel, setHotel] = useState([]);
 
  useEffect(() => {
    axios.get(`http://localhost:3000/properties/api/${id}`)
      .then(res => setHotel(res.data)
        );
  }, []);

  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/properties/api/getImages/${id}`);
        setImages(res.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [id]);
  return (
    
    <>
    <FirstSection destination={hotel.location?.city}/>
      <Container  style={{ marginTop: '2rem',marginLeft:'150px',marginRight:'150px',paddingRight:'350px' }}>
    <div className="App">
      <nav className="breadcrumb">
        <a href="/">Home</a> &gt;
        <a href="/search">Hôtels</a> &gt;
        <a href={`/search/${hotel.location?.city}`}>{hotel.location?.city}</a> &gt;
        <a href={`/search/${id}`}>{hotel.name}</a>

       </nav>
       <div className="property-nav">
          <a href="#Home" className="active">Vue d'ensemble</a>
          <a href="#">Infos sur les appartements et tarifs</a>
          <a href="#Amenties">Équipements</a>
          <a href="#Rules">Règles de la maison</a>
          <a href="#">À savoir</a>
          <a href="#Reviews">Commentaires clients (5)</a>
        </div>
      <div className="property-details">
       

      <div className="property-header">
  <div className="header-content">
    <h1>{hotel.name}</h1>
    <IoHeartOutline className="iconIoHeart iconIoHeart-left" />
    <IoShareSocialSharp className="iconIoHeart iconIoHeart-right" />
    <a href="#Dispo"> <button className="reserve-btn">Réservez</button></a>
  </div>
  <p className="address">
    <span role="img" aria-label="location">📍</span>{hotel.location?.city}, {hotel.location?.state}, {hotel.location?.country}, {hotel.location?.address} – <a href="#">Excellent emplacement - voir la carte</a> – 
   
  </p>
  <span className='address ajusterTarif'><IoPricetagOutline className="iconIoPrice iconIoPrice-left"/> Nous ajustons nos tarifs </span>
    
</div>

        
      </div>
    </div>
    </Container>
 
    <Container maxWidth="lg" style={{ marginTop: '0.5rem', marginBottom: '2rem', marginLeft: '150px', marginRight: '150px !important',paddingRight:'350px' }}>
    {hotel && (
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
                 
                  <button className="price-adjust-btn" onClick={openFullscreen}>See ALL Photos</button>
                </Grid>
                     {/* Hotel Details */}
                     <Grid item xs={12}>
             <Box>
              <Typography variant="h4" component="h2" gutterBottom>
                {hotel.name}
                <Box display="inline" ml={2}>
                  {[...Array(hotel.overall_rating)].map((_, i) => (
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
                  {hotel.description}
                </Typography>
                <Divider style={{ margin: '1rem 0' }} />
              </Box>
            </Grid>
            <Grid item xs={12}>
         <Typography variant="h5" component="h3" >
            Overview
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '2rem' }}>
            {hotel.description}
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
                    {hotel.location?.city}, {hotel.location?.state}, {hotel.location?.country}
                  </Typography>
                </Box>
                <Divider />
                <Box display="flex" flexDirection="column" my={2}>
                  <Typography variant="body1">
                    Address: {hotel.location?.address}
                  </Typography>
                  <Typography variant="body1">
                    City: {hotel.location?.city}
                  </Typography>
                  <Typography variant="body1">
                    State: {hotel.location?.state}
                  </Typography>
                  <Typography variant="body1">
                    Country: {hotel.location?.country}
                  </Typography>
                </Box>
                <Divider />

                <Box my={2} style={{ height: '200px' }}>
            {hotel.location?.coordinates ? (
              <Maps pointx={hotel.location.coordinates.latitude} pointy={hotel.location.coordinates.longitude} />
            ) : (
              <div>Map not available</div>
            )}
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

    <div id="Dispo"><Disponibilite /></div>
    <div id="Reviews"> <Reviews /></div>
    <div id="Rules"> <Rules/></div>
    <Commentaire/>
    
    </>
  );
};