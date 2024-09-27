import React from 'react';
import { Container, Divider, Box, Typography, Grid, TextField, Button } from '@mui/material';
import Rating from '@mui/material/Rating'; // Ensure you import Rating

export const Commentaire = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem', padding: '0 85px' }}>
      <Divider style={{ margin: '1rem 0' }} />
      <Box sx={{ maxWidth: '100%', margin: '20px auto', padding: 2, fontFamily: 'Arial, sans-serif' }}>
        <Typography variant="h4" gutterBottom>
          Leave a Reply
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Your email address will not be published.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {['Location', 'Staff', 'Cleanliness', 'Value for money', 'Comfort', 'Facilities', 'Free WiFi'].map((item) => (
                <Box key={item} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography>{item}</Typography>
                  <Rating name={item.toLowerCase().replace(' ', '_')} defaultValue={5} precision={0.5} readOnly />
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Text" variant="outlined" fullWidth />
              <TextField label="Email" variant="outlined" fullWidth />
              <TextField label="Write Your Comment" variant="outlined" fullWidth multiline rows={4} />
              <Button className="reserve-btn" variant="contained" color="primary" fullWidth>
                Post Comment
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
