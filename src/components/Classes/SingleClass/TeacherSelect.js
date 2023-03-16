import React from 'react';
import { useSelector } from "react-redux";
import { 
    Box,
    InputLabel,
    Select,
    FormControl,
    MenuItem,
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