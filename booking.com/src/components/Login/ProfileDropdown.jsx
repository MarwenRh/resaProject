import React, { useState, Fragment,useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Menu,
  Stack,
  Typography,
} from '@mui/material';
import IconifyIcon from './IconifyIcon';
import { useHistory } from 'react-router-dom'; // Use useHistory for v5
import {jwtDecode} from 'jwt-decode'; 
import axios from 'axios';

const ProfileDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null); 
  const history = useHistory(); // For v5
  const handleOpenDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [user, setUser] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("token");
    alert("Successfully Logged Out");
    history.push("/"); // For v5
    window.location.reload();
};
const [hostData, setHostData] = useState([]);
const [propertyData, setPropertyData] = useState(null); // Set initial state to null

useEffect(() => {
  const fetchData = async () => {
    const token = localStorage.getItem("jwt") || localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        console.log('Decoded user:', decoded);

        const headers = { Authorization: `Bearer ${token}` };

        try {
          // Fetch host details by email
          const hostResponse = await axios.get(
            `http://localhost:3000/hosts/api/getByEmail/${decoded.username}`,
            { headers }
          );
          const hostData = hostResponse.data;
          setHostData(hostData);

          const hostsID = hostData._id; 

          try {
            // Fetch properties by hostsID
            const propertyResponse = await axios.get(
              `http://localhost:3000/properties/api/getByHostsID/${hostsID}`,
              { headers }
            );
            const propertyData = propertyResponse.data;
            setPropertyData(propertyData); // Store the property as an object, not an array
            console.log('Property data:', propertyData);

          } catch (propertyError) {
            console.error('Error fetching properties:', propertyError);
          }
        } catch (hostError) {
          console.error('Error fetching hosts:', hostError);
        }
      } catch (error) {
        console.error('Token decoding failed:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  fetchData();
}, []);


const profileData = propertyData && Object.keys(propertyData).length > 0 ? [
  {
    href: `/search/${propertyData.location?.city}/${propertyData._id}`,
    title: 'My Profile',
    icon: 'fa:user-circle-o',
    color: 'primary.light',
  },
] : [
  {
    href: `/`,  // Default to `/` when propertyData is empty or not available
    title: 'My Profile',
    icon: 'fa:user-circle-o',
    color: 'primary.light',
  },
];


  return (

    <Fragment>
      <IconButton sx={{ p: 0, position: 'relative' }} onClick={handleOpenDropdown}>
        <Avatar
          alt="Avatar"
          src="assets/images/hero-slider-1.jpg"
          slotProps={{
            img: {
              sx: {
                objectFit: 'cover',
                position: 'absolute',
                top: '75%',
                left: '30%',
                transform: 'translate(-50%, -50%) scale(1.5)',
              },
            },
          }}
          sx={{ width: { xs: 40, md: 45, xl: 60 }, height: { xs: 40, md: 45, xl: 60 } }}
        />
      </IconButton>
      {/* Profile Menu Dropdown */}
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: 280,
            bgcolor: 'common.white',
          },
        }}
      >
        <Box p={3}>
          <Typography variant="subtitle1" color="text.primary">
            User Profile
          </Typography>
          <Stack direction="row" py={2.5} spacing={1.5} alignItems="center">
            <Avatar src="assets/images/hero-slider-1.jpg" alt="Profile Image" sx={{ width: 65, height: 65 }} />
            <Box>
              <Typography variant="subtitle2" color="text.primary" fontWeight={600}>
              {hostData.name}
              </Typography>
            
              <Typography
                variant="subtitle2"
                color="textSecondary"
                display="flex"
                alignItems="center"
                gap={0.5}
              >
                <IconifyIcon icon="majesticons:mail-line" />
                {user?.username || user?.email || 'User'}
              </Typography>
            </Box>
          </Stack>
          <Divider />
          {profileData.map((profileItem) => (
            <Box key={profileItem.title} sx={{ py: 1.5, px: 0 }}>
              <Link href={profileItem.href}>
                <Stack direction="row" spacing={1.5}>
                  <Stack
                    direction="row"
                    sx={{
                      width: 45,
                      height: 45,
                      bgcolor: 'neutral.light',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 1.5,
                    }}
                  >
                    <Avatar
                      variant="rounded"
                      sx={{
                        minWidth: 24,
                        height: 24,
                        bgcolor: 'transparent',
                      }}
                    >
                      <IconifyIcon icon={profileItem.icon} color={profileItem.color} />
                    </Avatar>
                  </Stack>
                  <div>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      noWrap
                      sx={{
                        width: 150,
                      }}
                    >
                      {profileItem.title}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        width: 150,
                      }}
                      noWrap
                    >
                      {profileItem.subtitle}
                    </Typography>
                  </div>
                </Stack>
              </Link>
            </Box>
          ))}
          <Box mt={1.25}>
            <Button onClick={handleLogout} variant="outlined" color="error" fullWidth>
              Logout
            </Button>
          </Box>
        </Box>
      </Menu>
    </Fragment>
  );
};

export default ProfileDropdown;
