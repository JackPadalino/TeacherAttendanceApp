import axios from 'axios';
import React, { useRef,useState } from 'react';
import { setAllUsers,addNewUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { Box,Modal,Button,Typography,TextField} from '@mui/material';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,

    display:'flex',
    flexDirection:'column',
    placeContent:'center',
    placeItems:"center"
  };

const formStyle = {
    // '& > :not(style)': { m: 1, width: '25ch' },
    display:'flex',
    flexDirection:'column',
    placeItems:'center',
    gap:"10px"
};

const CreateTeacherForm = () => {
    const dispatch = useDispatch();
    const firstName = useRef("");
    const lastName = useRef("");
    const [successModalOpen,setSuccessModalOpen] = useState(false);
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

    const handleSuccessModal = () => {
        setSuccessModalOpen(successModalOpen ? false : true);
    };

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
        handleSuccessModal();
        // phoneNumber.current="";
    };

    return (
        <>
            <Modal
                open={successModalOpen}
                onClose={handleSuccessModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                >
                <Box sx={modalStyle}>
                    <Typography variant="h5">New teacher added!</Typography>
                </Box>
            </Modal>
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
            {/* <form onSubmit={addTeacher}>
                <input placeholder="First name" name="first name" onChange={handleFirstNameChange}/>
                <input placeholder="Last name" name="last name" onChange={handleLastNameChange}/>
                <input placeholder="+1XXXXXXXXXX" name="phone number" onChange={handlePhoneNumberChange}/>
                <button>Submit</button>
            </form> */}
        </>
    );
};

export default CreateTeacherForm;