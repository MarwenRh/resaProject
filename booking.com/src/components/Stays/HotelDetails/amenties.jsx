import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Grid,
  Typography,
} from '@mui/material';
import { FaWifi, FaSnowflake, FaBath, FaTv, FaLaptop, FaShieldAlt, FaHospital, FaLock } from "react-icons/fa";
import { GiCarWheel, GiKitchenScale, GiFlowerPot } from "react-icons/gi";
import { MdSmokeFree } from "react-icons/md";
import { BiSolidWasher, BiSolidDryer } from "react-icons/bi";
import { PiHairDryer } from "react-icons/pi";
import { MdOutlineCrib } from "react-icons/md";
import { TbIroning3 } from "react-icons/tb";
import { PiCoatHanger } from "react-icons/pi";
import { FaFireExtinguisher } from "react-icons/fa";
import { MdOutlineOutdoorGrill } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { MdDeck } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';
import { FaWineBottle } from "react-icons/fa";
const amenitiesIcons = {
  WiFi: FaWifi,
  Kitchen: GiKitchenScale,
  Free_parking: FaParking,
  Air_conditioning: FaSnowflake,
  Heating: FaBath,
  TV: FaTv,
  Washer: BiSolidWasher,
  Dryer: BiSolidDryer,
  Laptop_friendly_workspace: FaLaptop,
  Crib: MdOutlineCrib,
  Hair_dryer: PiHairDryer,
  Iron: TbIroning3,
  Essentials: FaHome,
  Smoke_alarm: MdSmokeFree ,
  Carbon_monoxide_alarm: FaShieldAlt,
  Fire_extinguisher: FaFireExtinguisher,
  First_aid_kit: FaHospital,
  Lock_on_bedroom_door: FaLock,
  Hangers: PiCoatHanger,
  Shampoo: FaWineBottle,
  Garden_or_backyard:GiFlowerPot,
  Patio_or_balcony: MdDeck,
  BBQ_grill: MdOutlineOutdoorGrill,
};


export const Amenities = () => {
  const [amenities, setAmenities] = useState({});
  const location = useLocation();
  const id = location.pathname.split('/')[3]; // Extract id from URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/properties/api/${id}`);
        const data = response.data;
        setAmenities(data.amenities); // Assume amenities are within `data.amenities`
      } catch (error) {
        console.error('Error fetching amenities data:', error);
      }
    };

    fetchData();
  }, [id]);
 
 /* useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://api.stripe.com/v1/checkout/sessions',
          {
            
              success_url: 'https://example.com/success',
              line_items: [
                {
                  price: 'price_1MotwRLkdIwHu7ixYcPLm5uZ',
                  quantity: 2,
                },
              ],
              mode: 'payment',
            
          },
          {
            headers: {
              'Authorization': 'Bearer sk_test_51OPsP7H0uRtrpw0mG6BhPkf7lkSwFzxQ7K0Rvk7SB9EpuSL3DndpfrnJFnvlSKOKQXyvrNpMKMxvtTkZFVWYKXU800SaiXsCBO'
             
            }
          }
        );
        const data = response.data;
        setAmenities(data.amenities); // Assume amenities are within `data.amenities`
      } catch (error) {
        console.error('Error fetching amenities data:', error);
      }
    };

    fetchData();
  }, []);

*/

  return (
    <>
      <Typography variant="h5" component="h3" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        Most Popular Facilities
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(amenities).map(([key, value]) => {
          if (value) {
            const Icon = amenitiesIcons[key];
            if (Icon) {
              return (
                <Grid item xs={6} sm={4} md={3} key={key}>
                  <Box display="flex" alignItems="center">
                    <Icon style={{ marginRight: '2rem', fontSize: '1.5rem'  }} />
                    <Typography variant="body1">{key.replace(/_/g, ' ')}</Typography>
                  </Box>
                </Grid>
              );
            } else {
              console.warn(`No icon found for key: ${key}`);
            }
          }
          return null;
        })}
      </Grid>
    </>
  );
};
