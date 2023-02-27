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

    const handleChange = (newValue) => {
        setValue(newValue);
        console.log(typeof newValue['$d'].toISOString())
        console.log(typeof new Date(newValue['$d']));
    };

    const handleDateChange = async(selectedDate) => {
        setStartDate(selectedDate)
        dispatch(setDateSelected(true));

        const dateStr = selectedDate.toISOString();
        const foundDay = await axios.get(`/api/day/${dateStr}`);
        if(foundDay.data.id){
            dispatch(setCoverageDay(foundDay.data));
            dispatch(resetNewCoverageDate());
            const absences = await axios.get(`/api/attendance/absences/${selectedDate}`);
            const userPromises = absences.data.map(async (absence) => await axios.get(`/api/users/${absence.user.id}`));
            const userResponses = await Promise.all(userPromises);
            const userAbsences = userResponses.map(response => response.data);
            dispatch(setAllAbsentUsers(userAbsences));
        }else{
            dispatch(setNewCoverageDate(selectedDate));
            dispatch(resetCoverageDay());
            dispatch(resetAllAbsentUsers());

        };
    };

    return (
        <>
            <form>
                <label htmlFor="date">Date</label>
                <input type="date" id="date" onChange={handleDateChange}></input>
            </form>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                    label="Date desktop"
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