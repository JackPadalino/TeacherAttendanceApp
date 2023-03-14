import React from 'react';
import { Box,Container,Typography,TextField,Button,Grid,Link,FormControlLabel,Avatar} from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Home = () => {
    return (
      <Box component="main">

          <Typography 
            variant="h3"
            sx={{fontFamily:"Montserrat",textAlign: "center"}}
          >
            AMS Attendance
          </Typography>  

      </Box>
    );
};

export default Home;