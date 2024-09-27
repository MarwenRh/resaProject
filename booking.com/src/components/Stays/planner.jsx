// src/components/PlannerSection.js
import React from 'react';

const destinations = [
    { name: 'Carthage', distance: '15 km', imgUrl: '/villes/carthage.png' },
    { name: 'Sidi Bou Said', distance: '17 km', imgUrl: '/villes/sidiBoussid.png' },
    { name: 'Bizerte', distance: '57 km', imgUrl: '/villes/bizerte.png' },
    { name: 'Yasmine', distance: '60 km', imgUrl: '/villes/Hammamet.png' },
    
  ];
  

const PlannerSection = () => {
  return (
    <section>
      <h2>Planificateur de voyage facile à utiliser</h2>
      <div className="planner-options">
        <button>Plage</button>
        <button>Activités en extérieur</button>
        <button>Ville</button>
      </div>
      <div className="destinations">
        {destinations.map((dest) => (
          <div key={dest.name} className="destination-card">
            <img src={dest.imgUrl} alt={dest.name} />
            <div className="destination-info">
              <p className="destination-name">{dest.name}</p>
              <p className="destination-distance">{dest.distance}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlannerSection;
