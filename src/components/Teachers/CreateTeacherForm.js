import axios from 'axios';
import React, { useRef,useState } from 'react';
import { setAllUsers,addNewUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { Box,Modal,Button,Typography,TextField} from '@mui/material';

const formStyle = {
    display:'flex',
    flexDirection:'column',
    placeItems:'center',
    gap:"10px"
};

const CreateTeacherForm = ({handleParentModal,handleSuccessModal}) => {
    const dispatch = useDispatch();
    const firstName = useRef("");
    const lastName = useRef("");
    // const phoneNumber = useRef("");

    const handleFirstNameChange = (event) =>{
        firstName.current = event.target.value;
    };

    const handleLastNameChange = (event) =>{
        lastName.current = event.target.value;
    };

    // const handlePhoneNumberChange = (event) =>{
    //     phoneNumber.current = event.target.value;
    // };

    const addTeacher = async(event) =>{
        event.preventDefault();
        const body = {
            firstName:firstName.current,
            lastName:lastName.current,
            // phoneNumber:phoneNumber.current
        };
        await axios.post(`/api/users`,body)
            .then((newUser)=>dispatch(addNewUser(newUser.data)));
        await axios.get(`/api/users`)
            .then((users)=>dispatch(setAllUsers(users.data)));
        firstName.current="";
        lastName.current="";
        handleParentModal();
        handleSuccessModal();
        // phoneNumber.current="";
    };

    return (
        <>
            <Box
                component="form"
                sx={formStyle}
                noValidate
                autoComplete="off"
                >
                <Typography sx={{textAlign: "center"}} variant="h5">Add a teacher</Typography>
                <TextField id="outlined-basic" label="First name" variant="outlined" onChange={handleFirstNameChange}/>
                <TextField id="outlined-basic" label="Last name" variant="outlined" onChange={handleLastNameChange}/>
                {/* <TextField id="outlined-basic" label="Phone number" variant="outlined" /> */}
                <Button
                size="small"
                variant="contained"
                onClick={addTeacher}
                >
                    Submit
                </Button>

            </Box>
        </>
    );
};

export default CreateTeacherForm;