import React from 'react';
import { 
    Box,
    Grid,
    Container,
    Typography,
    TextField,
    List,
    ListItem,
    ListItemIcon,
    Button,
    ListItemText,
    InputLabel,
    Select,
    FormControl,
    MenuItem,
    FormGroup,
    FormLabel,
    Item,
    FormControlLabel,
    Checkbox,
    IconButton,
    Modal
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