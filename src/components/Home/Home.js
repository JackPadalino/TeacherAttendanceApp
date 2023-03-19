import React from 'react';
import { Box,Typography} from '@mui/material';
import "./style.css";

const Home = () => {
    return (
      <Box component="main" className="homeContainer">
        <Box>
          <Typography variant="h3" className="title">AMS Attendance</Typography>
        </Box>
      </Box>
    );
};

export default Home;