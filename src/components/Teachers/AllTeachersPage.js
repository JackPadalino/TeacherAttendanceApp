import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { NotFoundPage } from "..";
import CreateTeacherForm from './CreateTeacherForm';
import { Box,Modal,Button,Typography} from '@mui/material';

const pageStyle = {
    display:'flex',
    flexDirection:'column',
    gap:'20px'
};

const headingStyle={
    marginBottom:'0px'
};

const buttonStyle={
    all:'unset',
    cursor:'pointer',
    textDecoration:'underline',
    color:'blue'
};

const parentModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 5,
    px: 2,
    pb: 5,
    display:'flex',
    justifyContent:'center',
    alignItems:"center",
  };

const childModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 5,
    px: 2,
    pb: 5,
    display:'flex',
    justifyContent:'center',
    alignItems:"center",
  };

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
        <div style={pageStyle}>
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
            <div>
                <h1 style={headingStyle}>All teachers</h1>
                <button style={buttonStyle} onClick={handleParentModal}>Add a teacher</button>
            </div>
            <div>
                {allUsers.map((user) => {
                    return (
                        <div key={user.id}>
                            <Link to={`/teachers/${user.id}`}>{user.firstName} {user.lastName}</Link>
                        </div>  
                    );
                })}
            </div>
        </div>
    );
};

export default AllTeachersPage;
