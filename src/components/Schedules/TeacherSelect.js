import axios from 'axios';
import React from 'react';
import { useDispatch,useSelector } from "react-redux";
import { setScheduleAbsentUser } from "../../store/scheduleSlice";

const TeacherSelect = () => {
    const { allUsers } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { scheduleAbsentUser } = useSelector((state) => state.schedule);

    const handleTeacherChange = async(event) =>{
        const user = await axios.get(`/api/users/${event.target.value}`)
        dispatch(setScheduleAbsentUser(user.data));
    };

    return (
        <>
            <label htmlFor="teacher">Teacher</label>
            <select name='teacher' value={scheduleAbsentUser.id} onChange={handleTeacherChange}>
                <option value=''>-</option>
                {allUsers.map((user) => {
                    return (
                        <option key={user.id} value={user.id}>{user.fullName}</option>
                    );
                })}
            </select>
        </>
    );
};

export default TeacherSelect;