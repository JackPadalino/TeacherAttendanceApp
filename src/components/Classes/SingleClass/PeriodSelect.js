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

const PeriodSelect = ({period,handlePeriodChange}) => {
    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel id="period label">Period</InputLabel>
                <Select
                        labelId="period label"
                        id="period"
                        label="Period"
                        onChange={handlePeriodChange}
                        value={period}
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
    );
};

export default PeriodSelect;