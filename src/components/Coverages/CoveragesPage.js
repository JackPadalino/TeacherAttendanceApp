
import axios from 'axios';
import React, { useRef,useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import { DateSelect,LetterDaySelect,TeacherSelect } from './';
import { NotFoundPage } from "..";
import { setAllAbsentUsers,setAllCoverages,setTodaysCoverages } from "../../store/coverageSlice";
import { setAllUsers } from "../../store/userSlice";
import { Box,Typography,IconButton,useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { 
    pageTop,
    titleDateContainer,
    titleLeft,
    title,
    titleRight,
    pageBottom,
    teacherSelect,
    absentTeachers,
    letterDay,
    teacherBox,
    teacherNameDelete,
    teacherName,
    classTitle,
    coveringTeacher
} from "./style"; 
// import "./style.css";

const CoveragesPage = () => {
    const dispatch = useDispatch()
    const { coverageDay,allAbsentUsers,todaysCoverages } = useSelector((state) => state.coverage);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const theme = useTheme();
    const mobileView = useMediaQuery(theme.breakpoints.down('sm'),{noSsr:true});

    const deleteAbsence = async(event) => {
        // deleting the coverages associated with this absence first
        const userId = event.currentTarget.value;
        const absentUser = allAbsentUsers.find((user)=>user.id===userId);
        const classesCovered = absentUser.classes.filter((eachClass)=>eachClass.letterDays.includes(coverageDay.letterDay));
        const classesCoveredIds = classesCovered.map((eachClass)=>eachClass.id);
        const coveragesToDelete = todaysCoverages.filter((coverage)=>classesCoveredIds.includes(coverage.class.id));
        const coveragePromises = coveragesToDelete.map((coverage)=> axios.delete(`/api/coverages/${coverage.id}`));
        await Promise.all(coveragePromises);

        // now deleting this absence
        await axios.delete(`/api/attendance/absences/${coverageDay.id}/${userId}`);
        const absences = await axios.get(`/api/attendance/absences/${coverageDay.date}`);
        const userPromises = absences.data.map(absence => axios.get(`/api/users/${absence.user.id}`));
        const userResponses = await Promise.all(userPromises);
        const userAbsences = userResponses.map(response => response.data);
        dispatch(setAllAbsentUsers(userAbsences));

        // updating front end
        const updatedCoverages = await axios.get("/api/coverages");
        dispatch(setAllCoverages(updatedCoverages.data));
        const updatedTodaysCoverages = updatedCoverages.data.filter((coverage)=>coverage.dayId===coverageDay.id);
        dispatch(setTodaysCoverages(updatedTodaysCoverages));
        const updatedUsers = await axios.get('/api/users')
        dispatch(setAllUsers(updatedUsers.data));
    };

    if(!token) return <NotFoundPage/>
    return (
        <div className="coveragePageMain">
            <div className="pageTop">
                <div style={titleDateContainer}>
                    <div style={titleLeft}>
                        <DateSelect/> {Object.keys(coverageDay).length===0 ?
                        <LetterDaySelect/> :
                        <div style={{display:"flex",alignItems:"center"}}>
                            <h1><Link to={'/single-day'} style={letterDay}>{coverageDay.letterDay} Day</Link></h1>
                        </div>}
                    </div>
                    <h1 style={title}>Absences/Coverages</h1>
                    <div style={titleRight}></div>
                </div>
                {Object.keys(coverageDay).length > 0 && 
                <div style={teacherSelect}>
                    <TeacherSelect/>
                </div>}
            </div>
            {Object.keys(coverageDay).length > 0 &&
            <div style={pageBottom}>
                <div style={absentTeachers}>
                    {allAbsentUsers.map((user) => {
                        return (
                            <div key={user.id} style={teacherBox}>
                                <div style={teacherNameDelete}>
                                    <Typography style={teacherName}>{user.fullName}</Typography>
                                    <IconButton size="small" value={user.id} onClick={deleteAbsence}>
                                        <HighlightOffIcon fontSize="small" />   
                                    </IconButton>
                                </div>
                                <div>
                                    {user.classes.map((eachClass) =>{
                                        return (
                                            eachClass.letterDays.includes(coverageDay.letterDay) && 
                                            <div key={eachClass.id}>
                                                <Typography style={classTitle} align="center">
                                                    <Link to={`/coverages/${eachClass.id}/${eachClass.school}/${eachClass.period}/${coverageDay.letterDay}`} style={{textDecoration:"none",color:"#1976D2"}}>{eachClass.name} - {eachClass.period}</Link>
                                                </Typography>
                                                {todaysCoverages.map((eachCoverage)=>{
                                                    return (
                                                        eachCoverage.class.id===eachClass.id &&
                                                        <Typography sx={coveringTeacher} align="center">{eachCoverage.user.fullName}</Typography>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>  
                        );
                    })}
                </div>
            </div>}

        </div>
    );
};

export default CoveragesPage;