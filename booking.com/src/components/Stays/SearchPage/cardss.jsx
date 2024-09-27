// Cardss.js
import { Link } from '@material-ui/core';
import React from 'react';

const Cardss = ({ property,photoUrl }) => {
    return (
        <div>
             <div className="datadiv">

               <div > 
                <div className="image-section">
                    <img src={photoUrl} className="image" alt={property.name} />
                </div> 
                <div style={{ paddingLeft: '30px' }}>
                    <div className="price">{property.name} <span className="stars">★★★★</span></div>
                    <div className="content-section">
                        <p className="city">
                           {property.location.city}
                        </p>
                    </div>
                </div>
                <div className='left'>

                    <div className="rating">
                        <div className="score">7.0</div>
                    </div>               
                    <span className="amount">
                        <span></span>A partir de
                        <div className="price">TND 3943</div>
                        <div className="amount">Des frais supplémentaires<br /> peuvent s'appliquer</div>
                    </span>
                   
                    <a href={`/search/${property.location?.city}/${property._id}`}  params={{}} style={{ cursor : "pointer"}}>
                    Voir les détails</a> 
                   
                </div>
                </div>
        </div>  
        </div>
    );
};

export default Cardss;
