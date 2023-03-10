import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NotFoundPage } from "../..";
import { useSelector } from "react-redux";
import CreateClassForm from "./CreateClassForm";
import { Box,Container,Typography,Modal,List,ListItem,ListItemIcon,Button,ListItemText} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import { 
    mainContainer,
    headingStyle,
    className,
    buttonStyle,
    parentModalStyle,
    childModalStyle
 } from "./style";

const AllClassesPage = () => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const { allClasses } = useSelector((state) => state.class);
    const [parentModalOpen,setParentModalOpen] = useState(false);
    const [successModalOpen,setSuccessModalOpen] = useState(false);

    const [showForm,setShowForm] = useState(false);
    const [showButton,setShowButton] = useState(true);

    const showHideButton = () =>{
        setShowForm(true);
        setShowButton(false);
    };

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
                    {/* <CreateTeacherForm handleParentModal={handleParentModal} handleSuccessModal={handleSuccessModal}/> */}
                    <Typography variant="h5">This is a modal!</Typography>
                </Box>
            </Modal>
            <Modal
                open={successModalOpen}
                onClose={handleSuccessModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                >
                <Box sx={childModalStyle}>
                    <Typography variant="h5">New class added!</Typography>
                </Box>
            </Modal>
            <Box>
            <Typography variant="h3" sx={headingStyle}>All Classes</Typography>
                {showButton && <button style={buttonStyle} onClick={showHideButton}>Add a class</button>}
                {showForm && <CreateClassForm setShowForm={setShowForm} setShowButton={setShowButton}/>}
            </Box>
            <Box>
            <Button sx={buttonStyle} variant="outlined" size="small" onClick={handleParentModal}><AddIcon/>Add a class</Button>
                {allClasses.map((eachClass) => {
                    return (
                        eachClass.name!=='Team meeting' && 
                        <Box key={eachClass.id}>
                            <Typography sx={className}>
                                <Link to={`/classes/${eachClass.id}`}>{eachClass.name}</Link>
                            </Typography>
                        </Box>  
                    );
                })}
            </Box>
        </Box>
    );
};

export default AllClassesPage;