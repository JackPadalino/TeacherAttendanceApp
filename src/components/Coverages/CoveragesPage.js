import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import { DateSelect,LetterDaySelect,TeacherSelect } from './';
import { NotFoundPage } from "..";
import { setAllAbsentUsers } from "../../store/coverageSlice";
import { Box,Container,Typography,List,ListItem,ListItemIcon,ListItemText} from '@mui/material';

const deleteButtonStyle = {
    height:'15px',
    width:'15px',
    textAlign:'center',
    fontSize:'10px',
    padding:'0px'
};

const nameStyle = {
    display:'flex',
    alignItems:'center',
    gap:'10px'
};

const CoveragesPage = () => {
    const dispatch = useDispatch()
    const { coverageDay,allAbsentUsers,dateSelected } = useSelector((state) => state.coverage);
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const deleteAbsence = async(event) => {
        await axios.delete(`/api/attendance/absences/${coverageDay.id}/${event.target.value}`);
        const absences = await axios.get(`/api/attendance/absences/${coverageDay.date}`);
        const userPromises = absences.data.map(absence => axios.get(`/api/users/${absence.user.id}`));
        const userResponses = await Promise.all(userPromises);
        const userAbsences = userResponses.map(response => response.data);
        dispatch(setAllAbsentUsers(userAbsences)); // setting the global list of absent users in Redux store
    };

    if(!token) return <NotFoundPage/>
    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap:"30px",
                    placeSelf: "center",
                    placeItems: "center",
                    //placeContent: "center center",
                    position: "relative",
                    top: "5vh",
                }}
            >
            <Typography variant="h3" sx={{fontFamily:'Montserrat'}}>Absences/Coverages</Typography>
            <Box>
                <DateSelect/>
            </Box>
            {!coverageDay && dateSelected && <Box>
                <Typography variant="h6" sx={{fontFamily:'Montserrat',color:'red'}}>No information about this date. Please select a letter day to get started.</Typography>
                <LetterDaySelect/>
            </Box>}
            {coverageDay && <Box>
                <Typography variant="h6"><Link to={'/single-day'}>{coverageDay.date.slice(0,10)} {coverageDay.letterDay} day</Link></Typography>
                <Box>
                    <Box>
                        <TeacherSelect />
                    </Box>
                    {allAbsentUsers.map((user) => {
                        return (
                            <Box key={user.id}>
                                <Box style={nameStyle}>
                                    <p>{user.fullName}</p>
                                    <button value={user.id} onClick={deleteAbsence} style={deleteButtonStyle} >x</button>
                                </Box>
                                <ul>
                                    {user.classes.map((eachClass) =>{
                                        return (
                                            eachClass.letterDays.includes(coverageDay.letterDay) && 
                                            <li key={eachClass.id}>
                                                <Link to={`/coverages/${eachClass.id}/${eachClass.school}/${eachClass.period}/${coverageDay.letterDay}`}>
                                                    {eachClass.name} - {eachClass.period}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Box>  
                        );
                    })}
                </Box>
            </Box>}
            </Box>
        </Container>
    );
};

export default CoveragesPage;