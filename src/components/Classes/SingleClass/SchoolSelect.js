import React from 'react';
import { 
    Box,
    InputLabel,
    Select,
    FormControl,
    MenuItem,
} from '@mui/material';

const SchoolSelect = ({school,handleSchoolChange}) => {
    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel id="school label">School</InputLabel>
                <Select
                        labelId="school label"
                        id="school"
                        label="School"
                        onChange={handleSchoolChange}
                        value={school}
                >
                    <MenuItem value="MS">MS</MenuItem>
                    <MenuItem value="HS">HS</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default SchoolSelect;