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

const GradeSelect = ({grade,handleGradeChange}) => {
    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel id="grade label">Grade</InputLabel>
                <Select
                        labelId="grade label"
                        id="grade"
                        label="Grade"
                        onChange={handleGradeChange}
                        value={grade}
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
        </Box>
    );
};

export default GradeSelect;