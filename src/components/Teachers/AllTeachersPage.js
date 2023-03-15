import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { NotFoundPage } from "..";
import CreateTeacherForm from './CreateTeacherForm';
import { Box,Typography,Modal,Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { 
    mainContainer,
    pageTop,
    headingStyle,
    teacherName,
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
            <Box sx={pageTop}>
                <Typography variant="h3" sx={headingStyle}>All Teachers</Typography>
                <Button variant="contained" size="small" onClick={handleParentModal}><AddIcon/>Add a teacher</Button>
            </Box>
            <Box>
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
