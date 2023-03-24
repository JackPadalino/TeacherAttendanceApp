import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { NotFoundPage } from "..";
import CreateTeacherForm from './CreateTeacherForm';
import { Box,Typography,Modal,Button,List,ListItem,ListItemIcon,ListItemText} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import "./style.css";

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
        <Box className="allTeachersMainContainer">
            <Modal
                open={parentModalOpen}
                onClose={handleParentModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box className="allTeachersParentModal">
                    <CreateTeacherForm handleParentModal={handleParentModal} handleSuccessModal={handleSuccessModal}/>
                </Box>
            </Modal>
            <Modal
                open={successModalOpen}
                onClose={handleSuccessModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                >
                <Box className="allTeachersChildModal">
                    <Typography variant="h5">New teacher added!</Typography>
                </Box>
            </Modal>
            <Box className="allTeachersPageTop">
                <h1 className="allTeachersHeading">All Teachers</h1>
                <Button variant="contained" size="small" onClick={handleParentModal}><AddIcon/>Add a teacher</Button>
            </Box>
            <Box>
                <List>
                    {allUsers.map((user) => {
                        return (
                            <ListItem disablePadding key={user.id}>
                                <Link to={`/teachers/${user.id}`} className="allTeachersTeacherName">{user.firstName} {user.lastName}</Link>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </Box>
    );
};

export default AllTeachersPage;
