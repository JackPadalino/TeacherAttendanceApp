import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import { DateSelect,LetterDaySelect,TeacherSelect } from './';
import { NotFoundPage } from "..";
import { setAllAbsentUsers } from "../../store/coverageSlice";
import { Box,Typography,IconButton,List,ListItem,ListItemIcon,ListItemText} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SchoolIcon from '@mui/icons-material/School';

const deleteButtonStyle = {
    height:'15px',
    width:'15px',
    textAlign:'center',
    fontSize:'10px',
    padding:'0px'
};

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
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap:"30px",
                    //placeSelf: "center",
                    //placeItems: "center",
                    //placeContent: "center center",
                    position: "relative",
                    top: "5vh"
                }}
            >
                <Box sx={{display:"flex",flexDirection:"column",gap:"20px",alignItems:"center"}}>
                    <Typography variant="h3" sx={{fontFamily:'Montserrat'}}>Absences/Coverages</Typography>
                    {!coverageDay && dateSelected && <Typography sx={{fontFamily:'Montserrat',color:'red'}}>No information about this date. Please select a letter day to get started.</Typography>}
                    
                    <Box sx={{display:"flex",gap:"10px"}}>
                        <DateSelect/> {!coverageDay && dateSelected && <LetterDaySelect/>}
                    </Box>
                </Box>
                {coverageDay &&
                    <Box sx={{display:"flex"}}>
                        <Box sx={{display:"flex",flexDirection:"column",gap:"10px",width:"25%",height:"300px",borderRight:"1px solid lightgrey"}}>
                            <Typography variant="h3"><Link to={'/single-day'} style={{textDecoration:"none"}}>{coverageDay.letterDay} Day</Link></Typography>
                            <TeacherSelect/>
                        </Box>
                        <Box sx={{display:"flex",flexWrap:"wrap",alignItems:"flex-start",rowGap:"20px",width:"75%"}}>
                            
                            {allAbsentUsers.map((user) => {
                                return (
                                    <Box key={user.id} sx={{display:"flex",flexDirection:"column",justifyContent:"center",width:"33%"}}>
                                            <Box sx={{display:"flex",justifyContent:"center",gap:"10px"}}>
                                                <Typography sx={{fontFamily:'Montserrat',fontSize:"30px"}}>{user.fullName}</Typography>
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