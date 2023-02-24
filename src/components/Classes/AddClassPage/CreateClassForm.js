import axios from 'axios';
import React, { useState } from 'react';
import { setAllClasses } from "../../../store/classSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
    SchoolSelect,
    GradeSelect,
    PeriodSelect,
    LetterDaysSelect
} from '../AllClasses'

const formStyle = {
    display:'flex',
    flexDirection:'column',
    gap:'10px'
};

const CreateClassForm = ({setShowForm,setShowButton}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [className,setClassName] = useState('');
    const [school,setSchool] = useState('');
    const [grade,setGrade] = useState('');
    const [period,setPeriod] = useState('');
    const [letterDays,setLetterDays] = useState([]);
    const [successMessage,setSuccessMessage] = useState(false);
    
    const addClass = async(event) =>{
        event.preventDefault();
        const body = {
            className,
            school,
            grade,
            period,
            letterDays
        };
        await axios.post(`/api/classes`,body);
        const allClasses = await axios.get('/api/classes');
        dispatch(setAllClasses(allClasses.data));
        setSuccessMessage(true);
        setShowForm(false);
        setShowButton(true);
    };

    const handleNameChange = (event) =>{
        setClassName(event.target.value);
    };

    const handleSchoolChange = (event) =>{
        setSchool(event.target.value);
    };

    const handleGradeChange = (event) =>{
        setGrade(event.target.value);
    };

    const handlePeriodChange = (event) =>{
        setPeriod(event.target.value);
    };

    // adding a letter day to the letterDays array if not present or removing if present
    const handleLetterDaysChange =(event)=>{
        if(letterDays.includes(event.target.value)){
            setLetterDays(letterDays.filter(day=>day!==event.target.value))
        }else{
            setLetterDays([...letterDays,event.target.value]);
        };
    };

    return (
        <>
            <div>
                <form onSubmit={addClass} style={formStyle}>
                    <div>
                        <label htmlFor="class name">Class name</label>
                        <input name='class name' onChange={handleNameChange}/>
                    </div>
                    <div>
                        <label htmlFor="school">MS/HS</label>
                        <select name='school' value={school} onChange={handleSchoolChange}>
                            <option value="-">-</option>
                            <option value="MS">MS</option>
                            <option value="HS">HS</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="grade">Grade</label>
                        <select name='grade' onChange={handleGradeChange}>
                            <option value="-">-</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="period">Period</label>
                        <select name='period' onChange={handlePeriodChange}>
                            <option value="-">-</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
                    </div>
                    <div>
                        <label>Letter days</label>
                        <input type="checkbox" name="A day" value="A" onChange={handleLetterDaysChange}/>
                        <label htmlFor="A day">A</label>
                        <input type="checkbox" name="B day" value="B" onChange={handleLetterDaysChange}/>
                        <label htmlFor="B day">B</label>
                        <input type="checkbox" name="C day" value="C" onChange={handleLetterDaysChange}/>
                        <label htmlFor="C day">C</label>
                        <input type="checkbox" name="D day" value="D" onChange={handleLetterDaysChange}/>
                        <label htmlFor="D day">D</label>
                        <input type="checkbox" name="E day" value="E" onChange={handleLetterDaysChange}/>
                        <label htmlFor="E day">E</label>
                        <input type="checkbox" name="F day" value="F" onChange={handleLetterDaysChange}/>
                        <label htmlFor="F day">F</label>
                    </div>
                    <button style={{width:'60px'}}>Submit</button>
                </form>
                {successMessage && <p style={{ color: "green", marginTop: "10px" }}>Class '{className}' successfully created.</p>}
            </div>
        </>
    );
};

export default CreateClassForm;