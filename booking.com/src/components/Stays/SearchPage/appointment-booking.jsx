import React, { useCallback, useState } from 'react';
import { Datepicker } from '@mobiscroll/react';
import { Container } from '@mui/material';
import { useLocation } from "react-router-dom";
import './appointment-booking.css'; // Assurez-vous que ce fichier est inclus

function AppointementBooking({ onChange, value, onPriceChange }) {
  const [singleLabels, setSingleLabels] = useState([]);
  const [singleInvalid, setSingleInvalid] = useState([]);
  const [priceByDate, setPriceByDate] = useState({}); // Stocker les prix par date
  const location = useLocation();
  const propertyId = location.pathname.split('/')[3];

  const fetchAvailabilityData = useCallback(async (year, month) => {
    try {
      const response = await fetch(`http://localhost:3000/availabilities/api/propertyById/${propertyId}`);
      const data = await response.json();

      const labels = [];
      const invalid = [];
      const prices = {};

      data.forEach(entry => {
        entry.available_slots.forEach(slot => {
          const startDate = new Date(slot.start_time);
          const endDate = new Date(slot.end_time);

          if (slot.price > 0) {
            let currentDate = new Date(startDate);
            while (currentDate <= endDate) {
              labels.push({
                start: new Date(currentDate),
                end: new Date(currentDate),
                title: '$' + slot.price,
                textColor: '#e1528f',
              });
              prices[currentDate.toDateString()] = slot.price; // Associer la date au prix
              currentDate.setDate(currentDate.getDate() + 1);
            }
          } else {
            invalid.push(startDate);
          }
        });
      });

      setSingleLabels(labels);
      setSingleInvalid(invalid);
      setPriceByDate(prices); // Mettre à jour l'état avec les prix par date

    } catch (error) {
      console.error('Erreur lors de la récupération des données de disponibilité:', error);
    }
  }, [propertyId]);

  const handlePageLoadingSingle = useCallback((args) => {
    const d = args.firstDay;
    fetchAvailabilityData(d.getFullYear(), d.getMonth() + 1);
  }, [fetchAvailabilityData]);

  const handleDateChange = (event) => {
    onChange(event);

    const selectedDate = event.valueText;
    const selectedPrice = priceByDate[new Date(selectedDate).toDateString()];

    if (selectedPrice) {
      onPriceChange(selectedPrice); // Renvoie le prix pour la date sélectionnée
    }
  };

  return (
    <Container className="mbsc-form-group1">
      <div className="mbsc-form-group">
        <Datepicker
          theme="ios"
          themeVariant="light"
          display="inline"
          controls={['calendar']}
          labels={singleLabels}
          invalid={singleInvalid}
          pages={2}
          onPageLoading={handlePageLoadingSingle}
          value={value}
          onChange={handleDateChange} // Utilisez la nouvelle fonction de gestion de changement de date
          displayMode="inline"
          className="custom-datepicker" // Appliquer une classe personnalisée
        
        />
      </div>
    </Container>
  );
}

export default AppointementBooking;
