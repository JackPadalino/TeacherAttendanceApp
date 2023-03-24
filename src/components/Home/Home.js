import React from 'react';
import { Box } from '@mui/material';
import "./style.css";

const Home = () => {
    return (
      <Box component="main" className="homeContainer">
        <Box className="titleContainer">
          <h1 className="title">AMS Attendance App</h1>
        </Box>
      </Box>
    );
};

export default Home;