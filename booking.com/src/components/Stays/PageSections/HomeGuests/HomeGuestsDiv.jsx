import styled from "styled-components"
import {CarouselDiv} from "./CarosueDiv";
import {BoxDiv} from "./BoxDiv";
import {LocationCarosueDiv} from "./LocationCarosueDiv";
import { useEffect, useState } from "react";
import axios from 'axios';
import './homeGuest.css';
import { Container } from "@mui/material";

import { useHistory } from "react-router-dom";

export const HomeGuestsDiv = () => {
const [homeData, setHomeData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const history = useHistory();

const handleNavigation = (destination) => {
  localStorage.setItem('destination', destination);
  history.push(`/search/${destination}`);
};


useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/properties/api");
        const data = response.data;
		const firstThreeItems = data.slice(0, 3); // Récupérer les 3 premiers éléments
        setHomeData(firstThreeItems);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []); 

    return ( 
	<Container>
      
      <LocationCarosueDiv/>
      <br></br>
        <div className="travel-planner">
      <h2 className="section-title text-center mb-3">Nos hébergements</h2>
				
      <p> Laissez-vous inspirer lors de vos voyages <br></br>Un séjour dans l'une de ces locations de vacances pittoresques ne vous décevra pas.</p> 
     
      <br></br>
        <CarouselDiv>

		
		{homeData.map((i, index) => {
  const photoUrl = i.apartment_spaces && i.apartment_spaces.length > 0 && i.apartment_spaces[0].photos && i.apartment_spaces[0].photos.length > 1 
  ? i.apartment_spaces[0].photos[1] 
    : ''; 
  return (
    <BoxDiv 
      key={index} 
      url={photoUrl} 
      name={i.name} 
      city={i.location.city}
      price={100} 
      rating={i.overall_rating}
      reviews={2} 
      id={i._id}
    />
  );
})}
        </CarouselDiv>

       
</div>  
  <div className="untree_co-section">
		<div className="container">
			<div className="row text-center justify-content-center mb-5">
				<div className="col-lg-7"><h2 className="section-title text-center">Popular type</h2></div>
			</div>

			<div className="owl-carousel owl-3-slider">

				<div className="item">
					<a className="media-thumb" href="assets/images/hero-slider-1.jpg" data-fancybox="gallery">
						<div className="media-text">
							<h3>Pragser Wildsee</h3>
							<span className="location">Italy</span>
						</div>
						<img src="assets/images/hero-slider-1.jpg" alt="Image" className="img-fluid"/>
					</a> 
				</div>

				<div className="item">
					<a className="media-thumb" href="assets/images/hero-slider-2.jpg" data-fancybox="gallery">
						<div className="media-text">
							<h3>Oia</h3>
							<span className="location">Greece</span>
						</div>
						<img src="assets/images/hero-slider-2.jpg" alt="Image" className="img-fluid"/>
					</a> 
				</div>

				<div className="item">
					<a className="media-thumb" href="assets/images/hero-slider-3.jpg" data-fancybox="gallery">
						<div className="media-text">
							<h3>Perhentian Islands</h3>
							<span className="location">Malaysia</span>
						</div>
						<img src="assets/images/hero-slider-3.jpg" alt="Image" className="img-fluid"/>
					</a> 
				</div>


				<div className="item">
					<a className="media-thumb" href="assets/images/hero-slider-4.jpg" data-fancybox="gallery">
						<div className="media-text">
							<h3>Rialto Bridge</h3>
							<span className="location">Italy</span>
						</div>
						<img src="assets/images/hero-slider-4.jpg" alt="Image" className="img-fluid"/>
					</a> 
				</div>

				<div className="item">
					<a className="media-thumb" href="assets/images/hero-slider-5.jpg" data-fancybox="gallery">
						<div className="media-text">
							<h3>San Francisco, United States</h3>
							<span className="location">United States</span>
						</div>
						<img src="assets/images/hero-slider-5.jpg" alt="Image" className="img-fluid"/>
					</a> 
				</div>

				<div className="item">
					<a className="media-thumb" href="assets/images/hero-slider-1.jpg" data-fancybox="gallery">
						<div className="media-text">
							<h3>Lake Thun</h3>
							<span className="location">Switzerland</span>
						</div>
						<img src="assets/images/hero-slider-2.jpg" alt="Image" className="img-fluid"/>
					</a> 
				</div>

			</div>

		</div>
	</div>
</Container> )
}
