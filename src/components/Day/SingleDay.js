import axios from 'axios';
import React, { useState,useEffect,useRef } from 'react';
import { useNavigate,useParams,Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { NotFoundPage } from "..";
import { setAllUsers } from "../../store/userSlice";
import { setCoverageDay,resetCoverageDay,setAllAbsentUsers,setAllCoverages,resetTodaysCoverages } from "../../store/coverageSlice";
import { Box,Typography,Button,InputLabel,Select,MenuItem,FormControl,Modal} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import IconButton from "@mui/material/IconButton";
import { mainContainer,title,formBox,formStyle,modalStyle } from "./style";

const SingleDay = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { coverageDay,todaysCoverages } = useSelector((state) => state.coverage);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    
    const [modalOpen, setModalOpen] = useState(false);
    const [date,setDate] = useState(coverageDay.date);
    const [letterDay,setLetterDay] = useState(coverageDay.letterDay);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const handleLetterDayChange = (event) =>{
        setLetterDay(event.target.value);
    };

    // function to delete all coverages for this day if letter day is changed or if day is deleted
    const deleteCoverages = async()=>{
        const coveragePromises = todaysCoverages.map((coverage)=> axios.delete(`/api/coverages/${coverage.id}`));
        await Promise.all(coveragePromises);
        // updating front end
        const {data:updatedCoverages} = await axios.get("/api/coverages");
        const {data:updatedUsers} = await axios.get("/api/users");
        dispatch(setAllCoverages(updatedCoverages));
        dispatch(resetTodaysCoverages());
        dispatch(setAllUsers(updatedUsers));
    };

    const updateDay = async(event) =>{
        event.preventDefault();
        try{
            deleteCoverages();
            const body = {
                date,
                letterDay
            };
            const updatedDay = await axios.put(`/api/day/${coverageDay.id}`,body);
            dispatch(setCoverageDay(updatedDay.data));
            navigate('/coverages');
        }catch(error){
            console.log(error);
        };
    };

    const deleteDay = async()=> {
        deleteCoverages();
        const absences = await axios.get(`/api/attendance/absences/${coverageDay.date}`);
        const userPromises = absences.data.map(absence => axios.get(`/api/users/${absence.user.id}`));
        const userResponses = await Promise.all(userPromises);
        const userAbsences = userResponses.map(response => response.data);
        dispatch(setAllAbsentUsers(userAbsences)); // setting the global list of absent users in Redux store
        await axios.delete(`/api/day/${coverageDay.id}`);
        dispatch(resetCoverageDay());
        navigate('/coverages');
    };

    if(!token) return <NotFoundPage/>
    return (
        <Box sx={mainContainer}>
            <Typography variant="h3" sx={title}>{coverageDay.date.slice(0,10)} {coverageDay.letterDay} day</Typography>
            <Box sx={formBox}>
                <form onSubmit={updateDay} style={formStyle}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Letter day</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Letter day"
                            value={letterDay}
                            onChange={handleLetterDayChange}
                        >
                            <MenuItem value="A">A</MenuItem>
                            <MenuItem value="B">B</MenuItem>
                            <MenuItem value="C">C</MenuItem>
                            <MenuItem value="D">D</MenuItem>
                            <MenuItem value="E">E</MenuItem>
                            <MenuItem value="F">F</MenuItem>
                        </Select>
                    </FormControl>
                    {/* <IconButton type="submit">
                        <CheckBoxIcon color="primary"/>
                    </IconButton> */}
                    <Button type="submit" variant='contained'>Save</Button>
                </form>
                <IconButton color="error" onClick={() => handleModalOpen()}>
                    <DeleteIcon color="error"/>
                </IconButton>
            </Box>
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" align="center">
                        Are you sure you want to delete this day?
                    </Typography>
                    <Button fullWidth variant="outlined" color="error" onClick={() => deleteDay()}>Delete</Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default SingleDay;