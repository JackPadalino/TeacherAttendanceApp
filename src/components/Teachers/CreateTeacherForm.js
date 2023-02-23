import axios from 'axios';
import React, { useState } from 'react';
import { setAllUsers,addNewUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";

const CreateTeacherForm = ({setShowForm,setShowButton}) => {
    const dispatch = useDispatch();
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');

    const handleFirstNameChange = (event) =>{
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) =>{
        setLastName(event.target.value);
    };

    const handlePhoneNumberChange = (event) =>{
        setPhoneNumber(event.target.value);
    };

    const addTeacher = async(event) =>{
        event.preventDefault();
        const body = {
            firstName,
            lastName,
            phoneNumber
        };
        await axios.post(`/api/users`,body)
            .then((newUser)=>dispatch(addNewUser(newUser.data)));
        await axios.get(`/api/users`)
            .then((users)=>dispatch(setAllUsers(users.data)));
        setShowForm(false);
        setShowButton(true);
    };

    return (
        <>
            <form onSubmit={addTeacher}>
                <input placeholder="First name" name="first name" onChange={handleFirstNameChange}/>
                <input placeholder="Last name" name="last name" onChange={handleLastNameChange}/>
                <input placeholder="+1XXXXXXXXXX" name="phone number" onChange={handlePhoneNumberChange}/>
                <button>Submit</button>
            </form>
        </>
    );
};

export default CreateTeacherForm;