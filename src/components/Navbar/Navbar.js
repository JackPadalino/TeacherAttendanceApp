import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { resetUser } from "../../store/userSlice";
import { Box,Drawer,IconButton,List,ListItem,ListItemButton } from '@mui/material';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import "./style.css";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // drawer variables and toggle
  const [menuState, setMenuState] = useState(false);
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMenuState({ ...menuState, ['left']: open });
  };

  // mobile menu
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="menuDrawer"
    >
      <List>
      <ListItem>
          <ListItemButton>
            <Link className="navLink" to="/home">AMS</Link>
          </ListItemButton>
        </ListItem>
        {user.id &&
        <Box>
          <ListItem>
            <ListItemButton>
              <Link className="navLink" to="/schedules">Schedules</Link>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <Link className="navLink" to="/coverages">Absences/Coverages</Link>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <Link className="navLink" to="/teachers">Teachers</Link>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <Link className="navLink" to="/classes">Classes</Link>
            </ListItemButton>
          </ListItem>
        </Box>}
        {!user.id && 
        <ListItem>
          <ListItemButton>
            <Link className="navLink" to="/login">Login</Link>
          </ListItemButton>
        </ListItem>}
        {user.id && 
        <ListItem>
          <ListItemButton>
            <button onClick={logout} className="logoutButton">Log out</button>
          </ListItemButton>
        </ListItem>}
      </List>
    </Box>
  );

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(resetUser());
    navigate('/login');
  };

  return (
    <Box>
      <Box className="mobileMenu">
        <IconButton color="error" onClick={toggleDrawer('left', true)}>
          <DensityMediumIcon sx={{color:"grey"}}/>
        </IconButton>
        <Drawer
          anchor={'left'}
          open={menuState['left']}
          onClose={toggleDrawer('left', false)}
        >
          {list('left')}
        </Drawer>
      </Box>
      <Box className="desktopMenu">
        <Box className="navLeft">
          <Link className="navLink" to="/">AMS</Link>
        </Box>
        {user.id && 
        <Box className="navCenter">
          <Link className="navLink" to="/schedules">Schedules</Link>
          <Link className="navLink" to="/coverages">Absences/Coverages</Link>
          <Link className="navLink" to="/teachers">Teachers</Link>
          <Link className="navLink" to="/classes">Classes</Link>
        </Box>}
        <Box className="navRight">
          {!user.id && <Link className="navLink" to="/login">Login</Link>}
          {user.id && <button onClick={logout} className="logoutButton">Log out</button>}
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;