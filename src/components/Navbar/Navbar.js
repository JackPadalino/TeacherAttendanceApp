import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { resetUser } from "../../store/userSlice";
import { Box,Typography,TextField,Button,Fab,Menu,MenuItem} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const navStyle={
  display:'flex',
  justifyContent:"space-between",
  alignItems:"center"
};

const navCenter={
  display:'flex',
  gap:"20px"
};

const navRight={
  display:"flex",
  gap:"10px"
};

const linkStyle={
  textDecoration:'none',
  fontFamily:'Montserrat',
  color:'black'
};

const buttonStyle={
  all:'unset',
  cursor:'pointer',
  fontFamily:'Montserrat',
  color:'black'
};

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const [addMenuOpen,setAddMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenAddMenu = () => {
    setAddMenuOpen(true);
  };
  const handleCloseAddMenu = () => {
    setAddMenuOpen(false);
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(resetUser());
    navigate('/login');
  };

  return (
    <div style={navStyle}>
      <div>
        <Link style={linkStyle} to="/">AMS Attendance</Link>
      </div>
      {user.id && <div style={navCenter}>
        <Link style={linkStyle} to="/schedules">Schedules</Link>
        <Link style={linkStyle} to="/coverages">Absences/Coverages</Link>
        <Link style={linkStyle} to="/teachers">Teachers</Link>
        <Link style={linkStyle} to="/classes">Classes</Link>
      </div>}
      <div style={navRight}>
        {!user.id && <Link style={linkStyle} to="/login">Login</Link>}
        {user.id && <Fab color="primary" aria-label="add" size="small">
            <AddIcon onClick={handleOpenAddMenu}/>
        </Fab>}
        <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseAddMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem >Profile</MenuItem>
        <MenuItem >My account</MenuItem>
        <MenuItem >Logout</MenuItem>
      </Menu>
        {user.id && <button onClick={logout} style={buttonStyle}>Logout</button>}
      </div>
    </div>
  );
};

export default Navbar;