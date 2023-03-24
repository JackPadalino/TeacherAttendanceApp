import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NotFoundPage } from "../..";
import { useSelector } from "react-redux";
import CreateClassForm from "./CreateClassForm";
import { Box,Typography,Modal,List,ListItem,ListItemIcon,Button,ListItemText} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import "./style.css";

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
        <Box className="allClassesMainContainer">
            <Modal
                open={parentModalOpen}
                onClose={handleParentModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box className="allClassesParentModal">
                    <CreateClassForm handleParentModal={handleParentModal} handleSuccessModal={handleSuccessModal}/>
                </Box>
            </Modal>
            <Modal
                open={successModalOpen}
                onClose={handleSuccessModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                >
                <Box className="childModalStyle">
                    <Typography variant="h5">New class added!</Typography>
                </Box>
            </Modal>
            <Box className="allClassesPageTop">
                <h1 className="allClassesHeadingStyle">All Classes</h1>
                <Button variant="contained" size="small" onClick={handleParentModal}><AddIcon/>Add a class</Button>
            </Box>
            <Box>
                <List>
                    {allClasses.map((eachClass) => {
                        return (
                            eachClass.name!=='Team meeting' && 
                            <ListItem disablePadding key={eachClass.id}>
                                <Link to={`/classes/${eachClass.id}`} className="allClassesClassName">{eachClass.name}</Link>
                            </ListItem>  
                        );
                    })}
                </List>
            </Box>
        </Box>
    );
};

export default AllClassesPage;