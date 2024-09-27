import { Icon } from '@iconify/react';
import { Box } from '@mui/material';
import React from 'react';

const IconifyIcon = ({ icon, width = 20, sx, ...rest }) => {
  const baseStyles = {
    width,
    height: width,
    flexShrink: 0,
    display: 'inline-flex',
  };

  return (
    <Box sx={{ ...baseStyles, ...sx }} {...rest}>
      <Icon icon={icon} />
    </Box>
  );
};

export default IconifyIcon;
