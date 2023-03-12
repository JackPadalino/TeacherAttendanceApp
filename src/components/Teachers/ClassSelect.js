import React from 'react';
import { useSelector } from "react-redux";
import {
    Box,
    InputLabel,
    Select,
    FormControl,
    MenuItem
} from '@mui/material';

const ClassSelect = ({handleClassChange}) => {
    const { allClasses } = useSelector((state) => state.class);

    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Add a class</InputLabel>
                <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Class"
                        onChange={handleClassChange}
                >
                    {allClasses.map((eachClass) => {
                        return (
                            eachClass.name!=='Team meeting' && 
                            <MenuItem key={eachClass.id} value={eachClass.id}>
                                {eachClass.name} {eachClass.letterDays}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </Box>
    );
};

export default ClassSelect;