import axios from 'axios';
import React, { useRef,useState } from 'react';
import { setAllUsers,addNewUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";

const CreateTeacherForm = () => {
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
        // phoneNumber.current="";
    };

    console.log('re-render');

    return (
        <>
            <form onSubmit={addTeacher}>
                <input placeholder="First name" name="first name" onChange={handleFirstNameChange}/>
                <input placeholder="Last name" name="last name" onChange={handleLastNameChange}/>
                {/* <input placeholder="+1XXXXXXXXXX" name="phone number" onChange={handlePhoneNumberChange}/> */}
                <button>Submit</button>
            </form>
        </>
    );
};

export default CreateTeacherForm;