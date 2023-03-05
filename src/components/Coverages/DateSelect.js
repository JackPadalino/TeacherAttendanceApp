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
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
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

    const handleDateChange = async(selectedDate) => {
        dispatch(setDateSelected(true));
        const newDate = selectedDate.hour(0).minute(0).second(0);
        // let dateStr = newValue.toDate();
        // dateStr.setTime(dateStr.getTime() - (dateStr.getTimezoneOffset() * 60000));
        // dateStr = dateStr.toISOString().substr(0, 10);
        // dateStr = dayjs.tz(dateStr,"America/New_York");
        setStartDate(newDate);

        const foundDay = await axios.get(`/api/day/${newDate}`);
        if(foundDay.data.id){
            console.log(foundDay.data);
            dispatch(setCoverageDay(foundDay.data));
            dispatch(resetNewCoverageDate());
            const absences = await axios.get(`/api/attendance/absences/${newDate}`);
            const userPromises = absences.data.map(async (absence) => await axios.get(`/api/users/${absence.user.id}`));
            const userResponses = await Promise.all(userPromises);
            const userAbsences = userResponses.map(response => response.data);
            dispatch(setAllAbsentUsers(userAbsences));
        }else{
            dispatch(setNewCoverageDate(newDate));
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