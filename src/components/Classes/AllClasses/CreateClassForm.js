import axios from 'axios';
import React, { useState } from 'react';
import { setAllClasses } from "../../../store/classSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
    Box,
    Typography,
    TextField,
    Button,
    InputLabel,
    Select,
    FormControl,
    MenuItem,
    FormLabel,
    FormControlLabel,
    Checkbox,
} from '@mui/material';

import { formStyle } from "./style";

const CreateClassForm = ({handleParentModal,handleSuccessModal}) => {
    const dispatch = useDispatch();
    const [className,setClassName] = useState('');
    const [school,setSchool] = useState('');
    const [grade,setGrade] = useState('');
    const [period,setPeriod] = useState('');
    const [letterDays,setLetterDays] = useState([]);
    
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
        handleParentModal();
        handleSuccessModal();
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
        <Box>
            <Box component="form" className="createClassFormStyle">
                <Typography sx={{textAlign: "center"}} variant="h5">Add a class</Typography>
                <Box>
                    <TextField sx={{width:"100%"}} id="outlined-basic" label="Class name" variant="outlined" onChange={handleNameChange}/>
                </Box>
                <Box>
                    <FormControl sx={{width:"33.33%"}}>
                        <InputLabel id="School select label">School</InputLabel>
                        <Select
                            labelId="School select label"
                            id="school select"
                            label="School"
                            onChange={handleSchoolChange}
                        >
                            <MenuItem value="MS">MS</MenuItem>
                            <MenuItem value="HS">HS</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{width:"33.33%"}}>
                        <InputLabel id="Grade select label">Grade</InputLabel>
                        <Select
                            labelId="Grade select label"
                            id="Grade select"
                            label="Grade"
                            onChange={handleGradeChange}
                        >
                            <MenuItem value="6">6</MenuItem>
                            <MenuItem value="7">7</MenuItem>
                            <MenuItem value="8">8</MenuItem>
                            <MenuItem value="9">9</MenuItem>
                            <MenuItem value="10">10</MenuItem>
                            <MenuItem value="11">11</MenuItem>
                            <MenuItem value="12">12</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{width:"33.33%"}}>
                        <InputLabel id="Period select label">Period</InputLabel>
                        <Select
                            labelId="Period select label"
                            id="Period select"
                            label="Period"
                            onChange={handlePeriodChange}
                        >
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                            <MenuItem value="6">6</MenuItem>
                            <MenuItem value="7">7</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl>
                        <FormLabel>Letter Days</FormLabel>
                        <Box>
                            <FormControlLabel control={<Checkbox value="A" onChange={handleLetterDaysChange}/>} label="A" />
                            <FormControlLabel control={<Checkbox value="B" onChange={handleLetterDaysChange}/>} label="B" />
                            <FormControlLabel control={<Checkbox value="C" onChange={handleLetterDaysChange}/>} label="C" />
                            <FormControlLabel control={<Checkbox value="D" onChange={handleLetterDaysChange}/>} label="D" />
                            <FormControlLabel control={<Checkbox value="E" onChange={handleLetterDaysChange}/>} label="E" />
                            <FormControlLabel control={<Checkbox value="F" onChange={handleLetterDaysChange}/>} label="F" />
                        </Box>
                    </FormControl>
                </Box>
                <Button type="submit" variant="contained" onClick={addClass}>Submit</Button>
            </Box>
        </Box>
    );
};

export default CreateClassForm;