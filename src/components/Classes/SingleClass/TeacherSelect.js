import React from 'react';
import { useSelector } from "react-redux";
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

const TeacherSelect = ({handleTeacherChange}) => {
    const { allUsers } = useSelector((state) => state.user);

    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel id="teacher select label">Add a teacher</InputLabel>
                <Select
                    labelId="teacher select label"
                    id="teacher select"
                    label="teacher"
                    onChange={handleTeacherChange}
                >
                    {allUsers.map((user) => {
                        return (
                            <MenuItem key={user.id} value={user.id}>{user.fullName}</MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </Box>
    );
};

export default TeacherSelect;