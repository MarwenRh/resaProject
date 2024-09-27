import './home.css';
import './App.css';
import React from "react";
import Hotels from './image/Hotels.png';
import Appartment from './image/Appartment.png';
import Resort from './image/Resort.png';
import Villas from './image/Villas.png';
import Cabins from './image/Cabins.png';
import Cottages from './image/Cottages.png';
import ServicedAppartment from './image/Serviced_appartment.png';
import Holidayhomes from './image/Holidayhomes.png';
import Guesthomes from './image/Guesthomes.png';
import Hostels from './image/hostels.png';
import { CarouselDiv } from '../HomeGuests/CarosueDiv';

import { useHistory } from "react-router-dom";
const items = [
  { image: Hotels, label: "Hôtels", dates: "14 août-23 août, 2 adultes", available: "126 disponibles" },
  { image: Appartment, label: "Appartements", dates: "14 août-23 août, 2 adultes", available: "536 disponibles" },
  { image: Resort, label: "Complexes hôteliers", dates: "14 août-23 août, 2 adultes", available: "52 disponibles" },
  { image: Villas, label: "Villas", dates: "14 août-23 août, 2 adultes", available: "27 disponibles" },
  { image: Cabins, label: "Cabins", dates: "14 août-23 août, 2 adultes", available: "31,734 cabins" },
  { image: Cottages, label: "Cottages", dates: "14 août-23 août, 2 adultes", available: "142,790 cottages" },
  { image: ServicedAppartment, label: "Appartements avec services", dates: "14 août-23 août, 2 adultes", available: "33,743 serviced apartments" },
  { image: Holidayhomes, label: "Maisons de vacances", dates: "14 août-23 août, 2 adultes", available: "406,281 holiday homes" },
  { image: Guesthomes, label: "Guesthomes", dates: "14 août-23 août, 2 adultes", available: "" },
  { image: Hostels, label: "Auberges", dates: "14 août-23 août, 2 adultes", available: "115,537 guest houses" },
];

function ByPropertyType() {
  const history = useHistory();

const handleNavigation = (type) => {
  localStorage.setItem('type', type);
  history.push('/searchType');
};
  return (
   
      <div className="travel-planner">
      <h2 className="section-title text-center mb-3">Recherche Par type Hebergements</h2>
				
     
      <div className="destinations">
      <CarouselDiv>
        {items.map((item) => (
          <div key={item.name} className="destination-card"  onClick={() => handleNavigation(item.label)}>
            <img src={item.image} alt={item.label} />
            <div className="destination-info">
              <h3 className="section-title text-center mb-3">{item.label}</h3>
              <p className="destination-etab">{item.dates}</p>
              <p className="destination-etab">{item.available}</p>
            </div>
          </div>
        ))}
        </CarouselDiv>
      </div>
      </div>
  );
}

export { ByPropertyType };