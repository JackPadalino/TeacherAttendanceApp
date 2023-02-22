import axios from 'axios';
import React,{ useRef } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { setCoverageDay } from "../../store/coverageSlice";

const LetterDaySelect = () => {
    const dispatch = useDispatch();
    const { newCoverageDate } = useSelector((state) => state.coverage);
    const selectedLetterDay = useRef("");

    const handleLetterDayChange = async(event)=>{
        event.preventDefault();
        selectedLetterDay.current = event.target.value;
        console.log(selectedLetterDay.current)
    };

    const createNewDay = async(event) => {
        event.preventDefault();
        const body = {
            date:new Date(newCoverageDate),
            letterDay:selectedLetterDay.current
        };
        await axios.post('/api/day',body);
        
        const foundDay = await axios.get(`/api/day/${newCoverageDate}`);
        if(foundDay.data.id){
            dispatch(setCoverageDay(foundDay.data));
        };
    };

    return (
        <>
            <form onSubmit={createNewDay}>
                <label htmlFor="letter day">Letter day</label>
                <select name="letter day" id="letter day" onChange={handleLetterDayChange}>
                    <option value="">-</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                </select>
                <input type='submit' value='Submit'/>
            </form>
        </>
    );
};

export default LetterDaySelect;