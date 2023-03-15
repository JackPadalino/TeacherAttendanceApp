import axios from 'axios';
import React,{ useState } from 'react';
import { useDispatch,useSelector } from "react-redux";
import {
    setSelectedCalendarDate,
    setCoverageDay,
    resetCoverageDay,
    setNewCoverageDate,
    resetNewCoverageDate,
    setAllAbsentUsers,
    resetAllAbsentUsers,
    setTodaysCoverages,
    resetTodaysCoverages
} from "../../store/coverageSlice";
import { Box,TextField } from '@mui/material';
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
    const { selectedCalendarDate,allCoverages } = useSelector((state) => state.coverage);

    const handleDateChange = async(selectedDate) => {
        dispatch(setSelectedCalendarDate(selectedDate));
        const newDate = selectedDate.hour(0).minute(0).second(0);
        // let dateStr = newValue.toDate();
        // dateStr.setTime(dateStr.getTime() - (dateStr.getTimezoneOffset() * 60000));
        const dateStr = newDate.toISOString();
        // dateStr = dayjs.tz(dateStr,"America/New_York");

        const foundDay = await axios.get(`/api/day/${dateStr}`);
        if(foundDay.data){
            dispatch(resetNewCoverageDate());
            dispatch(setCoverageDay(foundDay.data));
            const absences = await axios.get(`/api/attendance/absences/${newDate}`);
            const userPromises = absences.data.map(async (absence) => await axios.get(`/api/users/${absence.user.id}`));
            const userResponses = await Promise.all(userPromises);
            const userAbsences = userResponses.map(response => response.data);
            dispatch(setAllAbsentUsers(userAbsences));
            const todaysCoverages = allCoverages.filter((coverage)=>coverage.dayId===foundDay.data.id);
            dispatch(setTodaysCoverages(todaysCoverages));
        }else{
            dispatch(setNewCoverageDate(newDate));
            dispatch(resetCoverageDay());
            dispatch(resetAllAbsentUsers());
            dispatch(resetTodaysCoverages());
        };
    };

    return (
        <Box sx={{width:"200px"}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="Date"
                    inputFormat="MM/DD/YYYY"
                    value={Object.keys(selectedCalendarDate).length > 0 ? selectedCalendarDate : null}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </Box>
    );
};

export default DateSelect;