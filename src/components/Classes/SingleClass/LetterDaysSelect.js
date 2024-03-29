import React from 'react';
import { 
    Box,
    FormControl,
    FormLabel,
    FormControlLabel,
    Checkbox,
} from '@mui/material';

const LetterDaysSelect = ({letterDays,handleLetterDaysChange}) => {
    return (
        <Box>
            <FormControl>
                <FormLabel>Letter Days</FormLabel>
                <Box sx={{display:"flex"}}>
                    {letterDays.includes('A') ? <FormControlLabel control={<Checkbox defaultChecked value="A" onChange={handleLetterDaysChange}/>} label="A" /> :
                    <FormControlLabel control={<Checkbox value="A" onChange={handleLetterDaysChange}/>} label="A"/>}
                    {letterDays.includes('B') ? <FormControlLabel control={<Checkbox defaultChecked value="B" onChange={handleLetterDaysChange}/>} label="B" /> :
                    <FormControlLabel control={<Checkbox value="B" onChange={handleLetterDaysChange}/>} label="B"/>}
                    {letterDays.includes('C') ? <FormControlLabel control={<Checkbox defaultChecked value="C" onChange={handleLetterDaysChange}/>} label="C" /> :
                    <FormControlLabel control={<Checkbox value="C" onChange={handleLetterDaysChange}/>} label="C"/>}
                    {letterDays.includes('D') ? <FormControlLabel control={<Checkbox defaultChecked value="D" onChange={handleLetterDaysChange}/>} label="D" /> :
                    <FormControlLabel control={<Checkbox value="D" onChange={handleLetterDaysChange}/>} label="D"/>}
                    {letterDays.includes('E') ? <FormControlLabel control={<Checkbox defaultChecked value="E" onChange={handleLetterDaysChange}/>} label="E" /> :
                    <FormControlLabel control={<Checkbox value="E" onChange={handleLetterDaysChange}/>} label="E"/>}
                    {letterDays.includes('F') ? <FormControlLabel control={<Checkbox defaultChecked value="F" onChange={handleLetterDaysChange}/>} label="F" /> :
                    <FormControlLabel control={<Checkbox value="F" onChange={handleLetterDaysChange}/>} label="F"/>}
                </Box>
            </FormControl>
        </Box>
    );
};

export default LetterDaysSelect;