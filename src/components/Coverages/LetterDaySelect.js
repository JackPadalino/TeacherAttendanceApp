import axios from 'axios';
import React,{ useRef } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { setCoverageDay } from "../../store/coverageSlice";
import { Box,Button,InputLabel,Select,MenuItem,FormControl} from '@mui/material';

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
        <Box sx={{width:200}}>
            <form onSubmit={createNewDay} style={{display:"flex",gap:"10px"}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Letter day</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Letter day"
                        onChange={handleLetterDayChange}
                    >
                        <MenuItem value="A">A</MenuItem>
                        <MenuItem value="B">B</MenuItem>
                        <MenuItem value="C">C</MenuItem>
                        <MenuItem value="D">D</MenuItem>
                        <MenuItem value="E">E</MenuItem>
                        <MenuItem value="F">F</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained">Submit</Button>
            </form>
        </Box>
    );
};

export default LetterDaySelect;