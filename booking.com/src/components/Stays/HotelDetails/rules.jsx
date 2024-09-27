import React, { useEffect, useState } from 'react';
import { Container, Divider, Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { MdSmokeFree } from 'react-icons/md';
import { FaDog, FaBeer, FaClock } from 'react-icons/fa';
import { MdCleaningServices,MdPeopleOutline } from 'react-icons/md';
import { AiOutlineFileText } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export const Rules = () => {
  const [policies, setPolicies] = useState({});
  const location = useLocation();
  const id = location.pathname.split('/')[3]; // Extract id from URL

  const policyIcons = {
    smoking: <MdSmokeFree />,
    pets: <FaDog />,
    'parties or events': <FaBeer />,
    'Check-in_start': <FaClock />,
    'Check-in_end': <FaClock />,
    'Check-out_start': <FaClock />,
    'Check-out_end': <FaClock />,
    'Quiet_Hours_start': <FaClock />,
    'Quiet_hours_end': <FaClock />,
    Cleaning_Maintenance: <MdCleaningServices />,
    Cancellation_policy: <AiOutlineFileText />,
    guests_allowed: <MdPeopleOutline />,
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/properties/api/${id}`);
        const data = response.data;
        setPolicies(data.policies);
      } catch (error) {
        console.error('Error fetching policies data:', error);
      }
    };

    fetchData();
  }, [id]);

  const rules = [
    {
      key: 'Check-in_start',
      title: 'Check-in',
      description: `From ${policies['Check-in_start']} to ${policies['Check-in_end']}`,
    },
    {
      key: 'Check-out_start',
      title: 'Check-out',
      description: `From ${policies['Check-out_start']} to ${policies['Check-out_end']}`,
    },
    {
      key: 'Cancellation_policy',
      title: 'Cancellation / Prepayment',
      description: policies['Cancellation_policy'],
    },
    {
      key: 'guests_allowed',
      title: "Guests Allowed",
      description: policies['guests_allowed'] ? "All guests are welcome." : "No additional guests are permitted.",
    },
    
    {
      key: 'smoking',
      title: 'Smoking',
      description: policies['smoking'] ? "Smoking is allowed in this accommodation." : "This accommodation is non-smoking.",
    },
    {
      key: 'parties or events',
      title: 'Parties',
      description: policies['parties or events'] ? "Parties/events are allowed." : "Parties/events are not allowed.",
    },
    {
      key: 'pets',
      title: 'Pets',
      description: policies['pets'] ? "Pets are allowed." : "Pets are not allowed.",
    },
    {
      key: 'Cleaning_Maintenance',
      title: 'Cleaning and Maintenance',
      description: policies['Cleaning_Maintenance'],
    },
  ];
  

  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem', padding: '0 40px' }}>
      <Divider style={{ margin: '1rem 0' }} />
      <Box sx={{ maxWidth: 1000, margin: '2px auto', padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Policies
        </Typography>
        <List>
          {rules.map((rule, index) => (
            <Box key={index}>
              <ListItem alignItems="flex-start">
              <ListItemIcon>
            <Box sx={{ fontSize: 25,marginBottom:2 }}>
              {policyIcons[rule.key]}
            </Box>
          </ListItemIcon>

                <ListItemText
                  primary={rule.title}
                  secondary={typeof rule.description === 'string' ? rule.description.split('\n').map((line, i) => (
                    <Typography key={i} variant="body2" color="textSecondary">
                      {line}
                    </Typography>
                  )) : rule.description}
                />
              </ListItem>
              {index < rules.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Box>
    </Container>
  );
};
