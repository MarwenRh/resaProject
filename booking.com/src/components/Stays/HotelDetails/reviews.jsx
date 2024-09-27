import React, { useEffect, useState } from 'react';
import { Container, Divider, Grid, Paper, Typography, Box, Avatar, IconButton, Button } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const id = location.pathname.split('/')[3]; // Extract id from URL

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/reviews/api/propertyById/${id}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews data:', error);
      }
    };

    fetchReviews();
  }, [id]);

  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem', padding: '0 40px' }}>
      <Divider style={{ margin: '1rem 0' }} />
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} style={{ padding: '1.5rem', backgroundColor: '#f9f9f9' }}>
            <Typography variant="h6" gutterBottom>
              Guest reviews
            </Typography>
            <Typography variant="h4" style={{ color: '#3f51b5' }}>
              4.8
            </Typography>
            <Typography variant="body1" gutterBottom>
              Exceptional <br /> 3,014 reviews
            </Typography>
            <Divider style={{ margin: '1rem 0' }} />
            {[
              { label: 'Location', value: 9.4 },
              { label: 'Staff', value: 9.4 },
              { label: 'Cleanliness', value: 9.4 },
              { label: 'Value for money', value: 9.4 },
              { label: 'Comfort', value: 9.4 },
              { label: 'Facilities', value: 9.4 },
              { label: 'Free WiFi', value: 9.4 },
            ].map((item, index) => (
              <Box key={index} mb={2}>
                <Typography variant="body2">{item.label}</Typography>
                <Box display="flex" alignItems="center">
                  <Box width="100%" mr={1}>
                    <Box bgcolor="#f0f0f0" height="10px" borderRadius="5px" position="relative">
                      <Box bgcolor="#3f51b5" height="10px" borderRadius="5px" width={`${item.value * 10}%`} />
                    </Box>
                  </Box>
                  <Typography variant="body2" color="textSecondary">{item.value}</Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          {reviews.length > 0 ? reviews.map(review => (
            <Paper key={review._id} elevation={3} style={{ padding: '1.5rem', marginBottom: '1rem', backgroundColor: '#f9f9f9' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar>{review.reviewer_name.charAt(0)}</Avatar>
                <Box ml={2}>
                  <Typography variant="body2">{review.reviewer_name}</Typography>
                  <Typography variant="body2" color="textSecondary">{new Date(review.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Typography>
                </Box>
              </Box>
              <Typography variant="h6" color="primary" style={{ marginBottom: '0.5rem' }}>
                {review.rating} Superb
              </Typography>
              <Typography variant="body1" gutterBottom>
                {review.comment}
              </Typography>
              {/* Add images if you have them in your data */}
              <Box display="flex" alignItems="center">
                <IconButton>
                  <ThumbUpIcon />
                </IconButton>
                <Typography variant="body2" style={{ marginRight: '16px' }}>Helpful</Typography>
                <IconButton>
                  <ThumbDownIcon />
                </IconButton>
                <Typography variant="body2">Not helpful</Typography>
              </Box>
            </Paper>
          )) : (
            <Typography variant="body1" color="textSecondary">
              No reviews available.
            </Typography>
          )}
          <Button variant="outlined" color="primary" fullWidth style={{ marginTop: '1rem' }}>
            Show all reviews
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
