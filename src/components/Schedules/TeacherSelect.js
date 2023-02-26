import axios from 'axios';
import React from 'react';
import { useDispatch,useSelector } from "react-redux";
import { setScheduleAbsentUser } from "../../store/scheduleSlice";
import { Box,InputLabel,Select,FormControl,MenuItem} from '@mui/material';

const TeacherSelect = () => {
    const { allUsers } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { scheduleAbsentUser } = useSelector((state) => state.schedule);

    const handleTeacherChange = async(event) =>{
        const user = await axios.get(`/api/users/${event.target.value}`)
        dispatch(setScheduleAbsentUser(user.data));
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={scheduleAbsentUser.id}
                    label="Teacher"
                    onChange={handleTeacherChange}
                >
                    {allUsers.map((user) => {
                        return (
                            <MenuItem
                                key={user.id}
                                value={user.id}
                            >
                                {user.fullName}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </Box>
    );
};

export default TeacherSelect;