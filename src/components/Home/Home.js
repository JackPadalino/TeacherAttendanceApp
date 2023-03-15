import React from 'react';
import { Box,Typography} from '@mui/material';
import { home } from "./style";

const Home = () => {
    return (
      <Box component="main">

          <Typography 
            variant="h3"
            sx={home}
          >
            AMS Attendance
          </Typography>  

      </Box>
    );
};

export default Home;