import axios from 'axios';
import React,{useState,useEffect,useCallback,useRef} from 'react';
import { useSelector,useDispatch } from "react-redux";
import { setCoverageDay,setSelectedCoverageDate,setDaySelected,resetCoverageDay,setAllAbsentUsers,resetAllAbsentUsers } from "../../store/coverageSlice";

const DateSelect = () => {
    const dispatch = useDispatch();
    const { selectedCoverageDate } = useSelector((state) => state.coverage);

    const handleDateChange = async(event) => {
        event.preventDefault();
        dispatch(setDaySelected(true));

        const selectedDate = new Date(event.target.value);
        dispatch(setSelectedCoverageDate(selectedDate));

        await axios.get(`/api/day/${selectedDate}`)
            .then((foundDay)=>dispatch(setCoverageDay(foundDay.data)));

        const absences = await axios.get(`/api/attendance/absences/${selectedDate}`);
        const userPromises = absences.data.map(async (absence) => await axios.get(`/api/users/${absence.user.id}`));
        const userResponses = await Promise.all(userPromises);
        const userAbsences = userResponses.map(response => response.data);
        dispatch(setAllAbsentUsers(userAbsences));
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