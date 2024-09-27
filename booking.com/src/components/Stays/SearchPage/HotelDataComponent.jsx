
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

import React, { useState,useEffect } from 'react';
import {  FaArrowRight } from 'react-icons/fa';
import { PiHeartFill  } from "react-icons/pi";
import styles from "./HotelDataComponent.module.css"
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Import des icônes d'étoiles
import axios from 'axios';
const HotelDataComponent = (props) => {
    const {
        type,
        url,
        id,
        view,
        price,
        name,
        city,
        distance,
        bedSize,
        roomSize,
        cancelationPolicy,
        cancellation,
        reviews,
        rating,
        Breakfast,
        availableRooms,
        discountedPrice,
        place
    } = props
    
    console.log(props);
    console.log(cancelationPolicy);

const [isFavorited, setIsFavorited] = useState(false);
	const handleFavoriteClick = () => {
	  setIsFavorited(!isFavorited);
	};
  const history = useHistory();

  const destination = localStorage.getItem('destination');
  const handleNavigation = () => {
    history.push(`/search/${destination}/${id}`);
  };
  const [AvgPrice, setAvgPrice] = useState(0);
  useEffect(() => {
      axios.get(`http://localhost:3000/availabilities/api/propertyAvgPrice/${id}`)
          .then(response => {
              setAvgPrice(response.data);
          })
          .catch(error => {
              console.error('There was an error fetching the properties by propertyid!', error);
          });
 
}, [id]);
  function StarRating({ stars }) {
    const totalStars = 5; // Total de 6 étoiles
  
    const renderStars = () => {
      const fullStars = Math.floor(stars); // Nombre d'étoiles pleines
      const hasHalfStar = stars % 1 >= 0.5; // Si la note a une partie décimale >= 0.5
      const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0); // Calcul des étoiles vides
  
      const starsArray = [];
      for (let i = 0; i < fullStars; i++) {
        starsArray.push(<FaStar key={i} />); // Étoile pleine
      }
      if (hasHalfStar) {
        starsArray.push(<FaStarHalfAlt key="half" />); // Demi-étoile
      }
      for (let i = 0; i < emptyStars; i++) {
        starsArray.push(<FaRegStar key={`empty-${i}`} />); // Étoile vide
      }
  
      return starsArray;
    };
  
    return <span>{renderStars()}</span>;
  }
    return (
        <div className={styles.maindiv}  >
        <div className={styles.ImageSection}>
          <img src={url}  className={styles.image} />
          <div className={styles.overlay}>Tous Brunchs sont compris</div>
          <button
  className={`${styles.heartIcon} ${isFavorited ? styles.favorited : ''}`}
  onClick={handleFavoriteClick}
>    <PiHeartFill />
            </button>
        </div>
          
           <div className={styles.datadiv}>
          <h3>{name}  <span className={styles.stars}><StarRating  stars={rating} /></span> </h3>
          <div className={styles.contentSection}>
             <p className={styles.city}>
              <a href="#">{city}</a> - <a href="#">Indiquer sur la carte</a> - 8.7 km du centre
            </p>
             <button className={styles.airportTaxi}>{place}</button>
            <div className={styles.roomInfo}>
              
              <p>Room Size {roomSize}</p>
            </div>
            <div className={styles.amenities}>
            <div className={styles.verticalLine}></div>
            {Breakfast && (
  <p>✔ Breakfast is included</p>
)}

              
              <p>✔ {cancelationPolicy}</p>
            </div>
           
           
            </div>
                  
           </div>
       
          <div className={styles.left}> 
         
           <div className={styles.rating}>
              
              <span className={styles.scoresText}><span className={styles.hide}></span>Bien<span className={styles.hide}>h</span></span>
            
            
              <div className={styles.score}>{rating}</div>
            </div>
           
            <h5 >{type}</h5>
            <span className={styles.amount}> <span></span>9 nuits, 2 adultes 
              <div className={styles.price}>TND {AvgPrice}</div>
              <div className={styles.amount}>Des frais supplémentaires<br></br> peuvent s'appliquer</div></span>
            
  <button className={styles.availabilityButton} onClick={() => handleNavigation()}>
    Voir disponibilité <FaArrowRight />
  </button>
          </div>
    
       </div>);
};

export {HotelDataComponent};
