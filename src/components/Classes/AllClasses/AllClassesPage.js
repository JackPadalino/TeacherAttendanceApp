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
                    <CreateClassForm handleParentModal={handleParentModal} handleSuccessModal={handleSuccessModal}/>
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
            <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <Typography variant="h3" sx={headingStyle}>All Classes</Typography>
                <Button variant="contained" size="small" onClick={handleParentModal}><AddIcon/>Add a class</Button>
            </Box>
            <Box>
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