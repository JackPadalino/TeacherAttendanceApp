import axios from 'axios';
import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setAllAbsentUsers } from "../../store/coverageSlice";
import { Box,Button,InputLabel,Select,MenuItem,FormControl} from '@mui/material';
import { teacherSelectForm } from "./style";

const TeacherSelect = () => {
    const dispatch = useDispatch();
    const { allUsers } = useSelector((state) => state.user);
    const { coverageDay } = useSelector((state) => state.coverage);
    const [absentUserId,setAbsentUserId] = useState('');
    const [invalidEntry,setInvalidEntry] = useState(false);

    const handleTeacherChange = async(event) =>{
        setAbsentUserId(event.target.value);
    };

    const createAbsence = async(event)=>{
        event.preventDefault();
        if(absentUserId===''){
            setInvalidEntry(true);
        }else{
            const coverageDate = coverageDay.date;
            const coverageLetterDay = coverageDay.letterDay;
            const body = {absentUserId,coverageDate,coverageLetterDay};
            await axios.post('/api/attendance/absences',body);
            const absences = await axios.get(`/api/attendance/absences/${coverageDate}`);
            const userPromises = absences.data.map(absence => axios.get(`/api/users/${absence.user.id}`));
            const userResponses = await Promise.all(userPromises);
            const userAbsences = userResponses.map(response => response.data);
            dispatch(setAllAbsentUsers(userAbsences));
            setInvalidEntry(false);
        };
    };

    return (
        <form onSubmit={createAbsence} style={teacherSelectForm}>
            <FormControl sx={{width:"200px"}}>
                <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Teacher"
                    onChange={handleTeacherChange}
                >
                    {allUsers.map((user) => {
                        return (
                            <MenuItem key={user.id} value={user.id}>{user.fullName}</MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <Button type="submit" variant="contained">Absent</Button>
        </form>
    );
};

export default TeacherSelect;