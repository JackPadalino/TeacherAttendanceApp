import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { NotFoundPage } from "..";
import CreateTeacherForm from './CreateTeacherForm';
import { Box,Container,Typography,Modal,List,ListItem,ListItemIcon,Button,ListItemText} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import { 
    mainContainer,
    headingStyle,
    teacherName,
    buttonStyle,
    parentModalStyle,
    childModalStyle
 } from "./style";

const AllTeachersPage = () => {
    const { allUsers } = useSelector((state) => state.user);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [parentModalOpen,setParentModalOpen] = useState(false);
    const [successModalOpen,setSuccessModalOpen] = useState(false);
    
    // functions for handling modals
    const handleParentModal = () => {
        setParentModalOpen(parentModalOpen ? false : true);
    };

    const handleSuccessModal = () => {
        setSuccessModalOpen(successModalOpen ? false : true);
    };
    
    if(!token) return <NotFoundPage/>
    return (
        <Box sx={mainContainer}>
            <Modal
                open={parentModalOpen}
                onClose={handleParentModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={parentModalStyle}>
                    <CreateTeacherForm handleParentModal={handleParentModal} handleSuccessModal={handleSuccessModal}/>
                </Box>
            </Modal>
            <Modal
                open={successModalOpen}
                onClose={handleSuccessModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                >
                <Box sx={childModalStyle}>
                    <Typography variant="h5">New teacher added!</Typography>
                </Box>
            </Modal>
            <Box>
                <Typography variant="h3" sx={headingStyle}>All Teachers</Typography>
                
                
            </Box>
            <Box>
                {/* <Avatar sx={{ bgcolor: "white",width:30,height:30,border: '1px solid #1976d2' }}>
                    <AddIcon sx={{cursor:"pointer",color:"#1976d2"}} onClick={handleParentModal}/>
                </Avatar> */}
                <Button sx={buttonStyle} variant="outlined" size="small" onClick={handleParentModal}>Add a teacher</Button>
                {allUsers.map((user) => {
                    return (
                        <Box key={user.id}>
                            <Typography sx={teacherName}>
                                <Link to={`/teachers/${user.id}`}>{user.firstName} {user.lastName}</Link>
                            </Typography>
                        </Box>  
                    );
                })}
            </Box>
        </Box>
    );
};

export default AllTeachersPage;
