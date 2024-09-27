import React, { useState } from 'react';
import './place.css';
import { CarouselDiv } from './PageSections/HomeGuests/CarosueDiv';
import { useHistory } from 'react-router-dom';

const ExploreSection = () => {
  const destinations = [
    { name: 'Carthage', etab: '15 établissements', image: '/villes/carthage.png', tabs: ['Plage'] },
    { name: 'Sidi Bou Saïd', etab: '17 établissements', image: '/villes/sidiBoussid.png', tabs: ['Plage'] },
    { name: 'Bizerte', etab: '57 établissements', image: '/villes/bizerte.png', tabs: ['Plage', 'Ville'] },
    { name: 'Tunis', etab: '17 établissements', image: '/villes/tuniss.png', tabs: ['Ville'] },
    { name: 'Zarzis', etab: '17 établissements', image: '/villes/zarzis.png', tabs: ['Plage', 'Ville'] },
    { name: 'Yasmine', etab: '60 établissements', image: '/villes/Hammamet.png', tabs: ['Plage', 'Ville'] },
    { name: 'Ain Drahem', etab: '17 établissements', image: '/villes/ainDrahem.png', tabs: ['Ville'] },
    { name: 'Beja', etab: '17 établissements', image: '/villes/beja.png', tabs: ['Plage', 'Ville'] },
    { name: 'Djerba', etab: '17 établissements', image: '/villes/djerba.png', tabs: ['Plage', 'Ville'] },
    { name: 'Goulette', etab: '17 établissements', image: '/villes/goulette.png', tabs: ['Plage'] },
    { name: 'Kelibia', etab: '17 établissements', image: '/villes/kelibia.png', tabs: ['Plage', 'Ville'] },
    { name: 'Mahdia', etab: '17 établissements', image: '/villes/mahdia.png', tabs: ['Plage', 'Ville'] },
    { name: 'Sahara', etab: '17 établissements', image: '/villes/sahara.png', tabs: ['Activite'] },
    { name: 'Sousse', etab: '17 établissements', image: '/villes/sousse.png', tabs: ['Plage', 'Ville'] },
    { name: 'Tbarka', etab: '17 établissements', image: '/villes/tbarka.png', tabs: ['Activite', 'Ville'] },
    { name: 'Tozeur', etab: '17 établissements', image: '/villes/tozeur.png', tabs: ['Activite', 'Ville'] },
  ];

  const history = useHistory();

  const handleNavigation = (destination) => {
    localStorage.setItem('destination', destination);
    history.push(`/search/${destination}`);
  };

  const [activeTab, setActiveTab] = useState('Plage');

  const filteredDestinations = destinations.filter(dest => dest.tabs.includes(activeTab));

  return (
    <div className="app">
      <div className="travel-planner">
        <h1>Planificateur de voyage facile à utiliser</h1>
        <p>Suivez vos envies et explorez les meilleures destinations en Tunisie</p>

        <div className="tabs">
          <button
            className={activeTab === 'Plage' ? 'active' : ''}
            onClick={() => setActiveTab('Plage')}
          >
            🏖️ Plage
          </button>
          <button
            className={activeTab === 'Activite' ? 'active' : ''}
            onClick={() => setActiveTab('Activite')}
          >
            🚴 Activités en extérieur
          </button>
          <button
            className={activeTab === 'Ville' ? 'active' : ''}
            onClick={() => setActiveTab('Ville')}
          >
            🏙️ Ville
          </button>
        </div>
        <div className="destinations">
          <CarouselDiv>
            {filteredDestinations.map(dest => (
              <div
                key={dest.name}
                className="destination-card"
                onClick={() => handleNavigation(dest.name)}
              >
                <img src={dest.image} alt={dest.name} />
                <div className="destination-info">
                  <p className="destination-name">{dest.name}</p>
                  <p className="destination-etab">{dest.etab}</p>
                </div>
              </div>
            ))}
          </CarouselDiv>
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;
