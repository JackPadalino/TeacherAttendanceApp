import React from 'react';
import { useDispatch,useSelector } from "react-redux";
import { setScheduleLetterDay } from "../../store/scheduleSlice";

const LetterDaysSelect = () => {
    const dispatch = useDispatch();
    const { scheduleLetterDay } = useSelector((state) => state.schedule);

    const handleLetterDayChange = (event) =>{
        dispatch(setScheduleLetterDay(event.target.value));
    };

    return (
            <>
                <select name="letter day" id="letter day" value={scheduleLetterDay} onChange={handleLetterDayChange}>
                    <option value="-">-</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                </select>
            </>
    );
};

export default LetterDaysSelect;