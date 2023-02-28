import axios from 'axios';
import React,{ useState } from 'react';
import { useDispatch } from "react-redux";
import { 
    setCoverageDay,
    resetCoverageDay,
    setNewCoverageDate,
    resetNewCoverageDate,
    setDateSelected,
    setAllAbsentUsers,
    resetAllAbsentUsers 
} from "../../store/coverageSlice";
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const DateSelect = () => {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(dayjs);

    // const handlePicker1Change = async(event) => {
    //     event.preventDefault();
    //     dispatch(setDateSelected(true));
    //     const selectedDate = new Date(event.target.value).toISOString();
    //     const foundDay = await axios.get(`/api/day/${selectedDate}`);
    //     console.log(foundDay.data);
    //     if(foundDay.data.id){
    //         dispatch(setCoverageDay(foundDay.data));
    //         dispatch(resetNewCoverageDate());
    //         const absences = await axios.get(`/api/attendance/absences/${selectedDate}`);
    //         const userPromises = absences.data.map(async (absence) => await axios.get(`/api/users/${absence.user.id}`));
    //         const userResponses = await Promise.all(userPromises);
    //         const userAbsences = userResponses.map(response => response.data);
    //         dispatch(setAllAbsentUsers(userAbsences));
    //     }else{
    //         dispatch(setNewCoverageDate(selectedDate));
    //         dispatch(resetCoverageDay());
    //         dispatch(resetAllAbsentUsers());

    //     };
    // };

    const handleDateChange = async(newValue) => {
        dispatch(setDateSelected(true));
        setStartDate(newValue);
        const date1 = newValue.toDate().toISOString().slice(0,10);
        const date2 = "T00:00:00.000Z";
        const dateStr=date1+date2;
        const foundDay = await axios.get(`/api/day/${dateStr}`);
        if(foundDay.data.id){
            dispatch(setCoverageDay(foundDay.data));
            dispatch(resetNewCoverageDate());
            const absences = await axios.get(`/api/attendance/absences/${dateStr}`);
            const userPromises = absences.data.map(async (absence) => await axios.get(`/api/users/${absence.user.id}`));
            const userResponses = await Promise.all(userPromises);
            const userAbsences = userResponses.map(response => response.data);
            dispatch(setAllAbsentUsers(userAbsences));
        }else{
            dispatch(setNewCoverageDate(dateStr));
            dispatch(resetCoverageDay());
            dispatch(resetAllAbsentUsers());
        };
    };

    return (
        <>
            {/* <form>
                <label htmlFor="date">Date</label>
                <input type="date" id="date" onChange={handlePicker1Change}></input>
            </form> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                    label="Date"
                    inputFormat="MM/DD/YYYY"
                    value={startDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    />
            </LocalizationProvider>
        </>
    );
};

export default DateSelect;