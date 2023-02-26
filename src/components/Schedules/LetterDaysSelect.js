import React from 'react';
import { useDispatch,useSelector } from "react-redux";
import { setScheduleLetterDay } from "../../store/scheduleSlice";
import { Box,InputLabel,Select,FormControl,MenuItem} from '@mui/material';

const LetterDaysSelect = () => {
    const dispatch = useDispatch();
    const { scheduleLetterDay } = useSelector((state) => state.schedule);

    const handleLetterDayChange = (event) =>{
        dispatch(setScheduleLetterDay(event.target.value));
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Letter day</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={scheduleLetterDay}
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
        </Box>
    );
};

export default LetterDaysSelect;