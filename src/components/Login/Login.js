import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box,Container,Typography,TextField,Button,Grid,Link,FormControlLabel,Avatar} from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const loginWithToken = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });
      dispatch(setUser(response.data));
      navigate("/");
    }
  };

  const attemptLogin = async (event) => {
    event.preventDefault();
    const response = await axios.post("/api/auth", credentials);
    const token = response.data;
    window.localStorage.setItem("token", token);
    loginWithToken(token);
  };

  if(token) return (
    <Typography
      sx={{
        fontFamily:'Montserrat',
        color:'black'
      }}
    >
      You are already logged in.
    </Typography>)
  return (
    <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap:"10px",
            placeSelf: "center center",
            placeItems: "center center",
            placeContent: "center center",
            position: "relative",
            top: "15vh",
          }}
          component="form" 
          noValidate
          autoComplete="off"
          onSubmit={attemptLogin}
          className="loginRegForm"
        >
          <Avatar
            sx={{
              bgcolor: "white",
              border: '1px solid #1976d2'

            }}
          >
            <LockOutlinedIcon color="primary"/>
          </Avatar>
          <TextField
            //margin="normal"
            required
            fullWidth
            onChange={onChange}
            id="username"
            label="Username"
            name="username"
            //autoComplete="username"
            value={credentials.username}
            //autoFocus
          />
          <TextField
            //margin="normal"
            required
            fullWidth
            onChange={onChange}
            name="password"
            label="Password"
            type="password"
            id="password"
            value={credentials.password}
            //autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            fullHeight
          >
            Login
          </Button>
        </Box>
        {/* <div className="registerAccount">
            <Link to="/register">Need an account?</Link>
        </div> */}
    </Container>
  );
};

export default Login;