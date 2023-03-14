import React from 'react';
import { Box,Container,Typography,TextField,Button,Grid,Link,FormControlLabel,Avatar} from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Home = () => {
    return (
      <Container component="main">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap:"10px",
            placeSelf: "center center",
            placeItems: "center center",
            placeContent: "center center",
            position: "relative",
            top: "5vh",
          }}
        >
          <Typography 
            variant="h3"
            sx={{
              fontFamily:'Montserrat'
            }}
          >
            AMS Attendance
          </Typography>  
        </Box>
      </Container>
    );
};

export default Home;