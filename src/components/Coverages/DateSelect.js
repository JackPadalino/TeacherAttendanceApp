import axios from 'axios';
import React from 'react';
import { useDispatch } from "react-redux";
import { setCoverageDay,resetCoverageDay,setNewCoverageDate,resetNewCoverageDate,setDateSelected,setAllAbsentUsers,resetAllAbsentUsers } from "../../store/coverageSlice";

const DateSelect = () => {
    const dispatch = useDispatch();

    const handleDateChange = async(event) => {
        event.preventDefault();
        dispatch(setDateSelected(true));

        const selectedDate = new Date(event.target.value).toISOString();
        const foundDay = await axios.get(`/api/day/${selectedDate}`);
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
        </>
    );
};

export default DateSelect;