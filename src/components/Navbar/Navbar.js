import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { resetUser } from "../../store/userSlice";
import { Box,Typography,TextField,Button,Fab,Menu,MenuItem} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { navStyle,navLeft,navCenter,navRight,linkStyle,buttonStyle } from "./style";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const addMenuOpen = Boolean(anchorEl);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(resetUser());
    navigate('/login');
  };

  return (
    <Box sx={navStyle}>
      <Box style={navLeft}>
        <Link style={linkStyle} to="/">AMS Attendance</Link>
      </Box>
      {user.id && 
      <Box sx={navCenter}>
        <Link style={linkStyle} to="/schedules">Schedules</Link>
        <Link style={linkStyle} to="/coverages">Absences/Coverages</Link>
        <Link style={linkStyle} to="/teachers">Teachers</Link>
        <Link style={linkStyle} to="/classes">Classes</Link>
      </Box>}
      <Box sx={navRight}>
        {!user.id && <Link style={linkStyle} to="/login">Login</Link>}
        {user.id && <button onClick={logout} style={buttonStyle}>Log out</button>}
      </Box>
    </Box>
  );
};

export default Navbar;