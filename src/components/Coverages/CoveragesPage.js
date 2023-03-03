import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import { DateSelect,LetterDaySelect,TeacherSelect } from './';
import { NotFoundPage } from "..";
import { setAllAbsentUsers } from "../../store/coverageSlice";
import { Box,Typography,IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { 
    mainContainer,
    titleDateContainer,
    title,
    dateNotFound,
    letterDaySelect,
    pageLeftRightBox,
    pageLeftBox,
    letterDay,
    pageRightBox,
    teacherBox,
    teacherNameDelete,
    teacherName
} from "./style";

const CoveragesPage = () => {
    const dispatch = useDispatch()
    const { coverageDay,allAbsentUsers,dateSelected } = useSelector((state) => state.coverage);
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const deleteAbsence = async(event) => {
        await axios.delete(`/api/attendance/absences/${coverageDay.id}/${event.currentTarget.value}`);
        const absences = await axios.get(`/api/attendance/absences/${coverageDay.date}`);
        const userPromises = absences.data.map(absence => axios.get(`/api/users/${absence.user.id}`));
        const userResponses = await Promise.all(userPromises);
        const userAbsences = userResponses.map(response => response.data);
        dispatch(setAllAbsentUsers(userAbsences)); // setting the global list of absent users in Redux store
    };

    if(!token) return <NotFoundPage/>
    return (
        <Box sx={mainContainer}>
            <Box sx={titleDateContainer}>
                <Typography variant="h3" sx={title}>Absences/Coverages</Typography>
                {!coverageDay && dateSelected && <Typography sx={dateNotFound}>No information about this date. Please select a letter day to get started.</Typography>}
                
                <Box sx={letterDaySelect}>
                    <DateSelect/> {!coverageDay && dateSelected && <LetterDaySelect/>}
                </Box>
            </Box>
            {coverageDay &&
                <Box sx={pageLeftRightBox}>
                    <Box sx={pageLeftBox}>
                        <Typography variant="h4"><Link to={'/single-day'} style={letterDay}>{coverageDay.letterDay} Day</Link></Typography>
                        <TeacherSelect/>
                    </Box>
                    <Box sx={pageRightBox}>
                        {allAbsentUsers.map((user) => {
                            return (
                                <Box key={user.id} sx={teacherBox}>
                                        <Box sx={teacherNameDelete}>
                                            <Typography sx={teacherName}>{user.fullName}</Typography>
                                            <IconButton size="small" value={user.id} onClick={deleteAbsence}>
                                                <HighlightOffIcon fontSize="small" />   
                                            </IconButton>
                                        </Box>
                                        <Box>
                                            {user.classes.map((eachClass) =>{
                                                return (
                                                    eachClass.letterDays.includes(coverageDay.letterDay) && 
                                                    <Box key={eachClass.id}>
                                                        <Typography sx={{fontFamily:'Montserrat'}} align="center">
                                                            <Link to={`/coverages/${eachClass.id}/${eachClass.school}/${eachClass.period}/${coverageDay.letterDay}`}>{eachClass.name} - {eachClass.period}</Link>
                                                        </Typography>
                                                    </Box>
                                                )
                                            })}
                                        </Box>
                                </Box>  
                            );
                        })}
                    </Box>
                </Box>}

        </Box>
    );
};

export default CoveragesPage;